const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const { htmlContent, cssContent, images, patterns, logos } = req.body;

    const exportDir = path.join(__dirname, '..', '..', 'exported_layout');
    if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir, { recursive: true });
    }

    // Salvar o conteúdo HTML dos frames de visualização
    fs.writeFileSync(path.join(exportDir, 'index.html'), `
        <!DOCTYPE html>
        <html lang="en">

        <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="ad.size" content="width=300,height=250">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dell</title>
        <link rel="stylesheet" href="style.css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,700&display=swap" rel="stylesheet">

        <!-- ClickTag -->
        <script type="text/javascript">
        var clickTag = "";
        </script>
        
        </head>

        <body>
            <div id="ad">
                <div id="banner">
                    <a href="javascript:void(0);" onClick="window.open(window.clickTag)" id="clickTAG"></a>
                    ${htmlContent}
                </div>
            </div>
            <!--<img src="5.jpg" style="opacity: 0.5; top: 0; left: 0;position: absolute;">	-->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/gsap.min.js"></script>
            <script src="custom.js"></script>
        </body>
        </html>
    `);

    // Salvar o conteúdo CSS em um arquivo separado
    fs.writeFileSync(path.join(exportDir, 'style.css'), `
    
    /*-------------------------------------
    Reset
    ---------------------------------------*/

    /******Basic settings**********/
    * {
    margin: 0;
    padding: 0;
    }

    html {
    box-sizing: border-box;
    text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    }

    *,
    *:before,
    *:after {
    box-sizing: inherit;
    }

    img {
    border: 0;
    }

    a {
    text-decoration: none;
    }

    body {
    font-family: 'Roboto', sans-serif;
    color: #FFFFFF;
    }

    sup {
    vertical-align: 4px;
    font-size: 5px;
    line-height: 0;
    }

    .font-preloader {
    font-family: 'Roboto';
    font-weight: 300;
    visibility: hidden;
    width: 0;
    height: 0;
    }

    #frame_one,
    #frame_two,
    #frame_three,
    #frame_four,
    #frame_five {
    width: 100%;
    height: 100%;
}

    /*-------------------------------------
    Layout
    ---------------------------------------*/

    #ad {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    height: 100%;
    font-size: 10px;
    }

    #banner {
    position: absolute;
    background: #1B5744;
    display: block;
    width: 300px;
    height: 250px;
    overflow: hidden;
    cursor: pointer;
    visibility: hidden;
    }

    #clickTAG {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
    cursor: pointer;
    }

    #border {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    top: 0;
    left: 0;
    border: 1px solid #444;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    }${cssContent}`);

    // Salvar o conteúdo JS em um arquivo separado
    const jsContent = `
        var banner = document.getElementById('banner');
        var legal = document.getElementById('roll-cta');

        var tl = gsap.timeline({ repeat: 0, repeatDelay: 1.5 });
        gsap.defaults({
            ease: Quad.easeInOut,
            force3D: false,
            duration: 0.5
        });

        window.onload = function () {
            const el = document.body.querySelectorAll('.js-split-text');
            el.forEach(function (el, index) {
                el.innerHTML = el.textContent.split("").map(letter =>
                    \`<span class=letter>\${letter}</span>\`
                ).join("");
            });

            tl.set(banner, { visibility: "visible" })

                /*frame one*/
                .from(".dell-logo-f1, .funding-box-f1, .cta-1", .3, { autoAlpha: 0 }, "frame1")
                .from(".pro-f1", { autoAlpha: 0, x: "100%" }, "frame1")
                .from(".badge1 .letter", .3, { autoAlpha: 0, ease: 'Sine.easeIn', stagger: 0.02 }, "frame1+=.3")
                .from(" .bundle-txt-1", { autoAlpha: 0 }, "frame1+=1")
                .from(".title1 .letter", .3, { autoAlpha: 0, ease: 'Sine.easeIn', stagger: 0.02 }, "frame1+=.5")
                .to(".badge1, .bundle-txt-1, .title1", { autoAlpha: 0 }, "frame1+=2.5")
                .to(".pro-f1, .cta-1, .dell-logo-f1, .funding-box-f1", { autoAlpha: 0 }, "frame1+=2.7")

                /*frame two*/
                .add("frame2", "frame1+=3")
                .from(".f2-bg", .3, { autoAlpha: 0 }, "frame2")
                .from(".pattern-f2", { autoAlpha: 0, x: "20%" }, "frame2")
                .from(".f2-pro", { autoAlpha: 0, x: "100%" }, "frame2+=.3")
                .from(" .funding-box-f2, .cta-2", { autoAlpha: 0 }, "frame2+=.3")
                .from(".title2 .letter", .3, { autoAlpha: 0, ease: 'Sine.easeIn', stagger: 0.02 }, "frame2+=.3")
                .to(".title2", { autoAlpha: 0 }, "frame2+=2.5")
                .to(".f2-pro, .cta-2, .funding-box-f2, .pattern-f2", { autoAlpha: 0 }, "frame2+=2.7")


                /*frame three*/
                .add("frame3", "frame2+=3")
                .from(".f3-bgImg, .f3-bgUp", .3, { autoAlpha: 0 }, "frame3")
                .to(".cta-1", { autoAlpha: 1 }, "frame3")
                .from(".bundle-txt-3", { autoAlpha: 0 }, "frame3+=.3")
                .to(".f3-bgImg, .f3-bgUp, .bundle-txt-3, .cta-1", { autoAlpha: 0 }, "frame3+=2.7")

                /*frame four*/
                .add("frame4", "frame3+=3")
                .from(".pattern-f4", { autoAlpha: 0, y: "-20%" }, "frame4")
                .from(".f4-pro", { autoAlpha: 0, y: "-100%" }, "frame4+=.3")
                .from(".cta-3", .3, { autoAlpha: 0 }, "frame4")
                .set(".dell-element-4", { autoAlpha: 1, top: "0.5%" }, "frame4+=.3")
                .to(".dell-element-4", .75, { top: "45%" }, "frame4+=.3")
                .from(".title4 .letter", .3, { autoAlpha: 0, ease: 'Sine.easeIn', stagger: 0.02 }, "frame4+=.5")
                .from(".proname-txt-4", { autoAlpha: 0 }, "frame4+=.5")
                .to(".dell-element-4, .title4", { autoAlpha: 0 }, "frame4+=2.5")
                .to(".f2-bg, .pattern-f4, .f4-pro, .proname-txt-4, .cta-3", { autoAlpha: 0 }, "frame4+=2.7")

                /*frame five*/
                .add("frame5", "frame4+=3")
                .from(".f5-bg, .dell-logo-f5, .funding-box-f5, .cta-4", .3, { autoAlpha: 0 }, "frame5")
                .from(".badge5 .letter", .3, { autoAlpha: 0, ease: 'Sine.easeIn', stagger: 0.02 }, "frame5+=.3")
                .from(".title5 .letter", .3, { autoAlpha: 0, ease: 'Sine.easeIn', stagger: 0.02 }, "frame5+=.5")


                /*roll over*/
                // 	.from("#roll-cta", { autoAlpha: 0, x: "100%" }, "frame5+=.5")
                // 	.from("#rolltext", { autoAlpha: 0 }, "frame5+=.5")
                // 	.from("#legal-text", { autoAlpha: 0 }, "frame5+=.5")

                // legal.addEventListener("mouseover", legalHover);
                // function legalHover() {
                //tl.pause();
                // 	gsap.to("#legal", .5, { top: 0, ease: Power1.easeOut })
                // }

                // legal.addEventListener("mouseout", legalOut);
                // function legalOut() {
                // 	tl.play();
                // 	gsap.to("#legal", .5, { top: "-120%", ease: Power1.easeIn })
                // }

                ;

            //	tl.pause(2)
            var currentDuration = tl.duration();
            var repeatDelay = tl.repeatDelay();
            // console.log(currentDuration + repeatDelay);
            calculateLogoSizes();
            calculateCopySizes()
        };


        //-- Auto calculate vf logo size --//

        function calculateLogoSizes() {
            try {
                //. Define as proporções
                var proportionF1 = 0.5;
                var proportionF5 = 0.75;

                //. Pega os elementos
                var fundingLogof1 = document.getElementsByClassName('funding-logo')[0];
                var fundingLogof5 = document.getElementsByClassName('funding-logo')[0];
                var dellLogof1 = document.getElementsByClassName('dell-logo')[0];
                var dellLogof5 = document.getElementsByClassName('dell-logof5')[0];

                //. Set de todas as proporções
                var fundingHeightf1 = fundingLogof1 ? fundingLogof1.clientHeight : 0;
                var fundingHeightf5 = fundingLogof5 ? fundingLogof5.clientHeight : 0;
                var dellHeightf1 = Math.round(fundingHeightf1 * proportionF1);
                var dellHeightf5 = Math.round(fundingHeightf5 * proportionF5);

                //. Define as alturas e mostra-as com a largura no console
                if (dellLogof1) {
                    dellLogof1.style.height = \`\${dellHeightf1}px\`
                    console.log("Dell Logo f1: %c" + dellLogof1.offsetWidth + "x" + dellHeightf1 + "px", "color: #ad76fa");
                } else {
                    console.log("Dell Logo f1: %c" + "Não existe", "color: #fb5f5f");
                }
                if (dellLogof5) {
                    dellLogof5.style.height = \`\${dellHeightf5}px\`
                    console.log("Dell Logo f5: %c" + dellLogof5.offsetWidth + "x" + dellHeightf5 + "px", "color: #ad76fa");
                } else {
                    console.log("Dell Logo f5: %c" + "Não existe", "color: #fb5f5f");
                }
                if (fundingLogof1) {
                    console.log("Funding Logo f1: %c" + fundingLogof1.offsetWidth + "x" + fundingHeightf1 + "px", "color: #ad76fa");
                } else {
                    console.log("Funding Logo f1: %c" + "Não existe", "color: #fb5f5f");
                }
                if (fundingLogof5) {
                    console.log("Funding Logo f5: %c" + fundingLogof5.offsetWidth + "x" + fundingHeightf5 + "px", "color: #ad76fa");
                } else {
                    console.log("Funding Logo f5: %c" + "Não existe", "color: #fb5f5f");
                }
            } catch (error) {
                console.error(error);
            }
        }


        //-- Auto calculate funding copy size --//

        function calculateCopySizes() {
            // Get elements
            var fundingCopyf1 = document.getElementsByClassName('funding-copy')[0];
            var fundingCopyf5 = document.getElementsByClassName('funding-copy')[0];
            var ctaCopy = document.getElementsByClassName('cta-1')[0];

            // Set proportions
            var referenceSize = window.getComputedStyle(ctaCopy).fontSize;

            console.log("CTA Font Size: %c" + referenceSize, "color: #ff56b1");
            console.log("Funding Copy: %c" + referenceSize, "color: #ff56b1");

            // Set funding copy sizes
            fundingCopyf1.style.fontSize = referenceSize;
            fundingCopyf1.style.lineHeight = parseFloat(referenceSize) + 1 + "px";
            fundingCopyf5.style.fontSize = referenceSize;
            fundingCopyf1.style.lineHeight = parseFloat(referenceSize) + 1 + "px";

            window.getComputedStyle(fundingCopyf5).fontSize === referenceSize ? console.log("Does the font match sizes? %c" + "Yes", "color: #41d6c3") : console.log("Does the font match sizes? %c" + "No", "color: #fb5f5f");
        }
    `;

    fs.writeFileSync(path.join(exportDir, 'custom.js'), jsContent);


    // Copiar os padrões para o diretório de exportação
    const patternsDir = path.join(__dirname, '..', 'patterns');

    const patternFiles = ['pattern-f2.png', 'pattern-f4.png'];

    patternFiles.forEach(patternFile => {
        const srcPath = path.join(patternsDir, patternFile);
        const destPath = path.join(exportDir, patternFile);
        try {
            fs.copyFileSync(srcPath, destPath);
        } catch (error) {
            console.error(`Erro ao copiar a imagem: ${patternFile}`, error);
        }
    });

    // Copiar os logos para o diretório de exportação
    const logosDir = path.join(__dirname, '..', 'logos');
    logos.forEach(({ dellLogo, fundingLogo, dellFrameIndex, fundingFrameIndex }) => {
        if (dellLogo) {
            const dellLogoFileName = dellLogo.replace('/logos/', '');
            const dellLogoFileExtension = path.extname(dellLogoFileName);
            const dellDestFileName = `dell-logo-f${dellFrameIndex}${dellLogoFileExtension}`;
            const dellSrcPath = path.join(logosDir, dellLogoFileName);
            const dellDestPath = path.join(exportDir, dellDestFileName);
            try {
                fs.copyFileSync(dellSrcPath, dellDestPath);
            } catch (error) {
                console.error(`Erro ao copiar o logo da Dell: ${dellLogoFileName}`, error);
            }
        }

        if (fundingLogo) {
            const fundingLogoFileName = fundingLogo.replace('/logos/', '');
            const fundingLogoFileExtension = path.extname(fundingLogoFileName);
            const fundingDestFileName = `funding-logo-f${fundingFrameIndex}${fundingLogoFileExtension}`;
            const fundingSrcPath = path.join(logosDir, fundingLogoFileName);
            const fundingDestPath = path.join(exportDir, fundingDestFileName);
            try {
                fs.copyFileSync(fundingSrcPath, fundingDestPath);
            } catch (error) {
                console.error(`Erro ao copiar o logo de financiamento: ${fundingLogoFileName}`, error);
            }
        }
    });


    res.status(200).send('Exportação concluída com sucesso!');
});

module.exports = router;