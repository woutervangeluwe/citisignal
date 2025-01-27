export default function decorate(block) {
    const [fiberOfferWrapper] = block.children;
  
    const offerText = block.children[0];
    const offerCTA = block.children[1];
    const offerImage = block.children[2];

    offerText.id = 'offerText';
    offerText.className = 'offerText';
    offerCTA.id = 'offerCTA';
    offerCTA.className = 'offerCTA';
    offerImage.id = 'offerImage';
    offerImage.className = 'offerImage';

    document.querySelector("#offerText").innerHTML="Text";
    document.querySelector("#offerCTA").innerHTML="CTA";
    document.querySelector("#offerImage").innerHTML="<img style='max-width:100%;' src='https://vangeluw.blob.core.windows.net/vangeluw/animal-Wouter-1737058328.png?sv=2023-01-03&st=2025-01-27T12%3A26%3A43Z&se=2025-01-28T12%3A26%3A43Z&sr=b&sp=r&sig=UfyWaphZm2Jx07szWuknI1oBgqe3hJjLwTSsQnLKCxs%3D'/>";;

    const blockFiberOffer = document.createElement('blockFiberOffer');
    blockFiberOffer.textContent = fiberOfferWrapper.textContent.trim();
    fiberOfferWrapper.replaceChildren(blockFiberOffer);
  }