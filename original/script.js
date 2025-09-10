document.addEventListener('DOMContentLoaded', () => {
    // Canvas要素とコンテキスト
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    
    // スコア要素
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const finalScoreElement = document.getElementById('final-score');
    
    // ボタン要素
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const gameOverScreen = document.getElementById('game-over');
    
    // ゲーム設定
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    let gameSpeed = 7;
    
    // ゲーム状態
    let gameActive = false;
    let gamePaused = false;
    let gameLoop;
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    highScoreElement.textContent = highScore;
    
    // 蛇の初期状態
    let snake = [];
    let velocityX = 0;
    let velocityY = 0;
    let nextVelocityX = 0;
    let nextVelocityY = 0;
    
    // 餌の位置
    let foodX;
    let foodY;
    
    // 初期化関数
    function initGame() {
        // スコアのリセット
        score = 0;
        scoreElement.textContent = score;
        
        // 蛇の初期状態
        snake = [
            { x: 10, y: 10 }
        ];
        
        // 速度の初期化
        velocityX = 0;
        velocityY = 0;
        nextVelocityX = 0;
        nextVelocityY = 0;
        
        // 餌の配置
        placeFood();
        
        // ゲームオーバー画面を非表示
        gameOverScreen.classList.add('hidden');
    }
    
    // 餌の配置
    function placeFood() {
        // ランダムな位置に餌を配置
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        
        // 蛇の体と重ならないよう確認
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === foodX && snake[i].y === foodY) {
                placeFood(); // 重なる場合は再配置
                break;
            }
        }
    }
    
    // ゲーム更新関数
    function updateGame() {
        if (!gameActive || gamePaused) return;
        
        // 次のフレームの速度を現在の速度に反映
        velocityX = nextVelocityX;
        velocityY = nextVelocityY;
        
        // 蛇の頭の位置更新
        let headX = snake[0].x + velocityX;
        let headY = snake[0].y + velocityY;
        
        // 壁との衝突判定
        if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
            gameOver();
            return;
        }
        
        // 自分の体との衝突判定
        for (let i = 1; i < snake.length; i++) {
            if (headX === snake[i].x && headY === snake[i].y) {
                gameOver();
                return;
            }
        }
        
        // 新しい頭の位置を追加
        snake.unshift({ x: headX, y: headY });
        
        // 餌を食べた場合
        if (headX === foodX && headY === foodY) {
            // スコア更新
            score++;
            scoreElement.textContent = score;
            
            // ハイスコア更新
            if (score > highScore) {
                highScore = score;
                highScoreElement.textContent = highScore;
                localStorage.setItem('snakeHighScore', highScore);
            }
            
            // 餌を再配置
            placeFood();
            
            // ゲームスピード調整 (一定のスコアごとに速くする)
            if (score % 5 === 0 && gameSpeed < 15) {
                gameSpeed += 1;
            }
        } else {
            // 餌を食べていない場合は尻尾を削除
            snake.pop();
        }
        
        // 描画処理
        drawGame();
    }
    
    // 描画処理
    function drawGame() {
        // キャンバスのクリア
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 餌の描画
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
        
        // 蛇の描画
        snake.forEach((segment, index) => {
            // 頭と体で色を変える
            if (index === 0) {
                ctx.fillStyle = '#00FF00'; // 頭の色
            } else {
                ctx.fillStyle = '#00CC00'; // 体の色
            }
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            
            // 頭に目を追加
            if (index === 0) {
                ctx.fillStyle = '#000';
                // 進行方向によって目の位置を変える
                if (velocityX === 1) { // 右向き
                    ctx.fillRect((segment.x * gridSize) + gridSize - 7, (segment.y * gridSize) + 4, 3, 3);
                    ctx.fillRect((segment.x * gridSize) + gridSize - 7, (segment.y * gridSize) + gridSize - 7, 3, 3);
                } else if (velocityX === -1) { // 左向き
                    ctx.fillRect((segment.x * gridSize) + 4, (segment.y * gridSize) + 4, 3, 3);
                    ctx.fillRect((segment.x * gridSize) + 4, (segment.y * gridSize) + gridSize - 7, 3, 3);
                } else if (velocityY === -1) { // 上向き
                    ctx.fillRect((segment.x * gridSize) + 4, (segment.y * gridSize) + 4, 3, 3);
                    ctx.fillRect((segment.x * gridSize) + gridSize - 7, (segment.y * gridSize) + 4, 3, 3);
                } else if (velocityY === 1) { // 下向き
                    ctx.fillRect((segment.x * gridSize) + 4, (segment.y * gridSize) + gridSize - 7, 3, 3);
                    ctx.fillRect((segment.x * gridSize) + gridSize - 7, (segment.y * gridSize) + gridSize - 7, 3, 3);
                } else { // デフォルト（最初の状態）
                    ctx.fillRect((segment.x * gridSize) + 4, (segment.y * gridSize) + 4, 3, 3);
                    ctx.fillRect((segment.x * gridSize) + gridSize - 7, (segment.y * gridSize) + 4, 3, 3);
                }
            }
        });
        
        // グリッド線を薄く表示（オプション）
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = 0; i < tileCount; i++) {
            ctx.beginPath();
            ctx.moveTo(i * gridSize, 0);
            ctx.lineTo(i * gridSize, canvas.height);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, i * gridSize);
            ctx.lineTo(canvas.width, i * gridSize);
            ctx.stroke();
        }
    }
    
    // ゲーム開始
    function startGame() {
        if (gameActive) return;
        
        initGame();
        gameActive = true;
        
        // ゲームループ開始
        clearInterval(gameLoop);
        gameLoop = setInterval(updateGame, 1000 / gameSpeed);
        
        // 最初の動きを設定
        nextVelocityX = 1;
        nextVelocityY = 0;
    }
    
    // ゲーム一時停止／再開
    function togglePause() {
        if (!gameActive) return;
        
        gamePaused = !gamePaused;
        
        if (gamePaused) {
            clearInterval(gameLoop);
            
            // 一時停止表示
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#FFF';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('一時停止中', canvas.width / 2, canvas.height / 2);
        } else {
            gameLoop = setInterval(updateGame, 1000 / gameSpeed);
        }
    }
    
    // ゲームオーバー
    function gameOver() {
        gameActive = false;
        clearInterval(gameLoop);
        
        // ゲームオーバー画面表示
        finalScoreElement.textContent = score;
        gameOverScreen.classList.remove('hidden');
    }
    
    // キーボード入力
    document.addEventListener('keydown', (e) => {
        // ゲームが開始されていない場合はスペースキーでスタート
        if (!gameActive && e.code === 'Space') {
            startGame();
            return;
        }
        
        // 一時停止
        if (gameActive && e.code === 'Space') {
            togglePause();
            return;
        }
        
        // 方向キー
        switch (e.code) {
            case 'ArrowUp':
                if (velocityY !== 1) { // 下向きでなければ上に移動可能
                    nextVelocityX = 0;
                    nextVelocityY = -1;
                }
                break;
            case 'ArrowDown':
                if (velocityY !== -1) { // 上向きでなければ下に移動可能
                    nextVelocityX = 0;
                    nextVelocityY = 1;
                }
                break;
            case 'ArrowLeft':
                if (velocityX !== 1) { // 右向きでなければ左に移動可能
                    nextVelocityX = -1;
                    nextVelocityY = 0;
                }
                break;
            case 'ArrowRight':
                if (velocityX !== -1) { // 左向きでなければ右に移動可能
                    nextVelocityX = 1;
                    nextVelocityY = 0;
                }
                break;
        }
        
        // キーボード入力によるページスクロールを防止
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
            e.preventDefault();
        }
    });
    
    // モバイル向けタッチ操作対応
    let touchStartX = 0;
    let touchStartY = 0;
    
    canvas.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        e.preventDefault();
    }, false);
    
    canvas.addEventListener('touchmove', (e) => {
        if (!gameActive) {
            startGame();
            return;
        }
        
        if (gamePaused) {
            togglePause();
            return;
        }
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // スワイプ方向を判定
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // 水平方向のスワイプ
            if (diffX > 0 && velocityX !== -1) {
                // 右スワイプ
                nextVelocityX = 1;
                nextVelocityY = 0;
            } else if (diffX < 0 && velocityX !== 1) {
                // 左スワイプ
                nextVelocityX = -1;
                nextVelocityY = 0;
            }
        } else {
            // 垂直方向のスワイプ
            if (diffY > 0 && velocityY !== -1) {
                // 下スワイプ
                nextVelocityX = 0;
                nextVelocityY = 1;
            } else if (diffY < 0 && velocityY !== 1) {
                // 上スワイプ
                nextVelocityX = 0;
                nextVelocityY = -1;
            }
        }
        
        // タッチ開始位置を更新
        touchStartX = touchEndX;
        touchStartY = touchEndY;
        
        e.preventDefault();
    }, false);
    
    // ボタンイベント
    startBtn.addEventListener('click', startGame);
    
    restartBtn.addEventListener('click', () => {
        if (gameActive) {
            clearInterval(gameLoop);
        }
        startGame();
    });
    
    playAgainBtn.addEventListener('click', startGame);
    
    // 初期描画
    drawGame();
});