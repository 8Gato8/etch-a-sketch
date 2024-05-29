const boxContainer = document.querySelector('.box-container') as HTMLDivElement;
const setButton = document.querySelector('.set') as HTMLButtonElement;
const eraseButton = document.querySelector('.erase') as HTMLButtonElement;
const multicolorButton = document.querySelector('.multicolor') as HTMLButtonElement;
const palette = document.querySelector('.palette') as HTMLInputElement;
const BOX_CONTAINER_SIDE_LENGTH = 800;

let isMulticolorModeOn = false;
let boxesPerSide = 64;

function createBox(sideLength: number) {
  const box = document.createElement('div');
  box.setAttribute('class', 'box');
  box.style.cssText = `width: ${sideLength}px;`;
  return box;
}

function appendBoxToboxContainer(box: HTMLDivElement) {
  boxContainer.appendChild(box);
}

function emptyBoxContainer() {
  while (boxContainer.firstChild) {
    boxContainer.removeChild(boxContainer.firstChild);
  }
}

function createNewGrid(boxesPerSide: number) {
  for (let i = 1; i <= boxesPerSide ** 2; i++) {
    const floatNumber = BOX_CONTAINER_SIDE_LENGTH / boxesPerSide;
    const box = createBox(Math.round(floatNumber * 100) / 100);
    appendBoxToboxContainer(box);
  }
}

function paintBox(e: MouseEvent) {
  const targetBox = e.target as HTMLDivElement;
  if (targetBox.parentNode === e.currentTarget) {
    const color = isMulticolorModeOn ? getRandomRGBColor() : palette.value;
    targetBox.style.backgroundColor = color;
  }
}

function getRandomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function toggleMulticolorMode() {
  isMulticolorModeOn = !isMulticolorModeOn;
}

function requestBoxesPerSide() {
  const newQuantity = prompt('Set a number of boxes per side', '16');
  if (!newQuantity) requestBoxesPerSide();

  if (newQuantity !== null) {
    setBoxesPerSide(+newQuantity);
    emptyBoxContainer();
    createNewGrid(boxesPerSide);
  }
}

function recreateCleanGrid() {
  emptyBoxContainer();
  createNewGrid(boxesPerSide);
}

function setBoxesPerSide(newQuantity: number) {
  boxesPerSide = newQuantity;
}

boxContainer.addEventListener('mouseover', paintBox);
setButton.addEventListener('click', requestBoxesPerSide);
multicolorButton.addEventListener('click', toggleMulticolorMode);
eraseButton.addEventListener('click', recreateCleanGrid);

createNewGrid(boxesPerSide);
