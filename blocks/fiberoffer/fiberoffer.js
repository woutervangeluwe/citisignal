export default function decorate(block) {
    const [fiberOfferWrapper] = block.children;
  
    const blockFiberOffer = document.createElement('blockFiberOffer');
    blockFiberOffer.textContent = fiberOfferWrapper.textContent.trim();
    fiberOfferWrapper.replaceChildren(blockFiberOffer);
  }