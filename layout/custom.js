document.addEventListener("DOMContentLoaded", function () {
	const frames = [
		{ id: 'frame-one', badge: 'Escolhas Inteligentes', title: 'Produtos para todos os Gamers', scText: 'Frete Grátis', proName: 'Novo Notebook Gamer G15', fundingCopy: 'Processadores Intel Core i7®', ctaText: 'Ver ofertas' },
		{ id: 'frame-two', title: 'A tecnologia mais recente para entrar no modo game', ctaText: 'Ver ofertas' },
		{ id: 'frame-three', scText: 'Até 12x sem juros', proName: 'Novo Notebook Gamer G15', ctaText: 'Ver ofertas' },
		{ id: 'frame-four', title: 'Equipamentos Superiores', proName: 'Monitor gamer com resolução dupla 4K de 27 Alienware AW2725QF', ctaText: 'Ver ofertas' },
		{ id: 'frame-five', badge: 'Escolhas Inteligentes', title: 'Desempenho Máximo', fundingCopy: 'Processadores Intel Core i7®', ctaText: 'Ver ofertas' },
	];

	frames.forEach(frame => {
		if (frame.badge) {
			document.querySelector(`#${frame.id} .badge`).textContent = frame.badge;
		}
		if (frame.title) {
			document.querySelector(`#${frame.id} .title`).textContent = frame.title;
		}
		if (frame.scText) {
			document.querySelector(`#${frame.id} .sc-txt`).textContent = frame.scText;
		}
		if (frame.proName) {
			document.querySelector(`#${frame.id} .proname-txt`).textContent = frame.proName;
		}
		if (frame.fundingCopy) {
			document.querySelector(`#${frame.id} .funding-copy`).textContent = frame.fundingCopy;
		}
		if (frame.ctaText) {
			document.querySelector(`#${frame.id} .cta`).textContent = frame.ctaText;
		}
	});
});