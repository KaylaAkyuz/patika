export const generateRandomCardPairs = () => {
  const totalPairs = 18;
  const maxImageId = 53;
  const selectedImageIds = [];
  const cardPairs = [];

  while (selectedImageIds.length < totalPairs) {
    const randomImageId = Math.floor(Math.random() * (maxImageId + 1));

    if (!selectedImageIds.includes(randomImageId)) {
      selectedImageIds.push(randomImageId);
      const pairId = String(randomImageId).padStart(4, "0");
      const imageUrl = `./images/cards/${pairId}.png`;
      cardPairs.push({ id: selectedImageIds.length, pairId, imageUrl });
      cardPairs.push({
        id: selectedImageIds.length + totalPairs,
        pairId,
        imageUrl,
      });
    }
  }

  for (let i = cardPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
  }

  for (let i = 0; i < cardPairs.length; i++) {
    cardPairs[i].id = i + 1;
  }
  return cardPairs;
};
