window.onload = function () {//quando carregar a janela

    var tela_jogo = document.getElementById('tela_jogo');

    /*
    pegando o contexto do canvas...
    o q permite fazer desenhos dentro de tal tag...
    é criado uma especie de tela q funciona através de conrdenas...
    */

    var context = tela_jogo.getContext("2d");

    //---------------------------------------------------------------
    var score = 0;
    var nivel_jogo = 100;
    var level = 1;
    
    //---------------------------------------------------------------

    document.addEventListener("keydown", keyPush)//sempre q uma tecla for pressionada chama a função keyPush

    /*
    chama uma função em um intervalo de tempo de ms
    neste caso a função 'jogo'
    */
    var execucao = setInterval(jogo, 100);//-------------------------------------------------------------


    // velocidade, se referindo ao numero de quadrados q mudarão ao atualizar o setinterval
    const velocidade = 1;

    var vx = vy = 0; // velocidade inicial no eixo 'x' e no eixo 'y'...
    var px = py = 10; // ponto de inicio da snake...
    var tq = 20; // tamanho quadrado q compoem os objetos...
    var qq = 20; // quantidade de quadrados na tela do tabuleiro...
    var ax = ay = 15; // coordenadas iniciais do alimento da snake...

    var trail = [];// array dos pedaços da snake
    tail = 5; // tamanho inicial da snake

    function jogo() {
        var html_level = document.getElementById('level');
        var html_score = document.getElementById('score');

        html_score.innerText='Score: '.concat(score);
        html_level.innerText='Level: '.concat(level);

        // atualizando o posicionamento da snake
        px += vx;
        py += vy;

        //verificando se a snake n saiu da tela
        if (px < 0) {
            px = qq - 1;
        }
        if (px > qq - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qq - 1;
        }
        if (py > qq - 1) {
            py = 0;
        }



        //define um estilo para o campo
        context.fillStyle = "black";

        /*
        executa o estilo para o campo (como um retangulo)
        parte da coordenada (0,0) q fica no canto superior esquerdo
        sendo em pixels
        indo até a largura da tela para o eixo 'x'
        indo até a altura da tela para eixo 'y'
        (numeros de pixels a serem pintados a partir da coordenada inicial)
        */
        context.fillRect(0, 0, tela_jogo.width, tela_jogo.height);

        // constroi alimento
        context.fillStyle = "red";
        context.fillRect(ax * tq, ay * tq, tq, tq);

        // constroi snake
        context.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * tq, trail[i].y * tq, tq-1, tq-1)

            if (trail[i].x == px && trail[i].y == py) {//verifica se a snake bateu no próprio rabo
                
                //reiniciando o jogo
                vx = vy = 0;
                tail = 5;
                px = py = 10;

                score = 0;
                level = 1;
                nivel_jogo = 100;
                clearInterval(execucao);
                execucao = setInterval(jogo, nivel_jogo);
                
            }
        }

        trail.push({ x: px, y: py });//adiciona um objeto json no array

        //para garantir que o rastro da snake n será maior do q a cobra
        while (trail.length > tail) {
            trail.shift();//retira o primeiro elemento da array
        }

        //verifica se a snake se encontra comendo o alimento
        if (ax == px && ay == py) {
            tail++;//aumenta o tamanho da cauda

            //Math.random gera um n° entre 0 e 1
            //Math.random arredonda para baixo
            ax = Math.floor(Math.random() * qq);
            ay = Math.floor(Math.random() * qq);

            //---------------------------------------------------
            score += 1;
            
            if (score%7 == 0) {
                level++;
                
                if (nivel_jogo>40) {
                    nivel_jogo -= 20;
                }
                
                
                clearInterval(execucao);
                execucao = setInterval(jogo, nivel_jogo);
            }
            //-------------------------------------------------------
        }

    }

    function keyPush(event){//movimentação
        
        /* 
        w => keycode:87
        a => keycode:65
        s => keycode:83
        d => keycode:68
        */
        
        switch (event.keyCode) {
            case 87://up
                
                    if (vy!=0) {
                        vy=vy;
                        vx=0
                    }else{
                        vy = -velocidade;
                        vx = 0;
                    }
                
                break;

            case 65://left
                
                    
                    if (vx != 0) {
                        vx = vx;
                        vy = 0
                    }else{
                        vx = -velocidade;
                        vy = 0;
                    }
                
                break;

            case 83://down
                

                    if (vy != 0) {
                        vy = vy;
                        vx = 0
                    }else{
                        vy = velocidade;
                        vx = 0;
                    }
                
                break;

            case 68://right
                

                    if (vx != 0) {
                        vx = vx;
                        vy = 0
                    }else{
                        vx = velocidade;
                        vy = 0;
                    }
                
                break;

            //para setas
            case 38://up
                
                    if (vy != 0) {
                        vy = vy;
                        vx = 0
                    } else {
                        vy = -velocidade;
                        vx = 0;
                    }
                
                break;

            case 37://left
                

                    if (vx != 0) {
                        vx = vx;
                        vy = 0
                    } else {
                        vx = -velocidade;
                        vy = 0;
                    }
                
                break;

            case 40://down
                

                    if (vy != 0) {
                        vy = vy;
                        vx = 0
                    } else {
                        vy = velocidade;
                        vx = 0;
                    }
                
                break;

            case 39://right
                

                    if (vx != 0) {
                        vx = vx;
                        vy = 0
                    } else {
                        vx = velocidade;
                        vy = 0;
                    }
                
                break;

        
            default:
                break;
        }

    }

}