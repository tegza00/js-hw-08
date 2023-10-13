const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryList = document.querySelector('.js-gallery');
const lightBox = document.querySelector('.js-lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');
const lightBoxOverlay = document.querySelector('.lightbox__overlay');
const lightBoxCloseButton = document.querySelector('[data-action="close-lightbox"]');

 // Функція для розмітки зображення
function createGalleryItem(item) {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery__item');

  const link = document.createElement('a');
  link.classList.add('gallery__link');
  link.href = item.original;

  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = item.preview;
  image.dataset.source = item.original;
  image.alt = item.description;

  link.appendChild(image);
  listItem.appendChild(link);

  return listItem;
}

 // функція для вставки елементів на сайт

function genaratorGalery (items) {
  const galeryItems = items.map(createGalleryItem);
  galleryList.append(...galeryItems)
};

genaratorGalery(galleryItems)

// Функіця віддкриття модального вікна

   function openModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
      return;
    }
  
    lightBoxImage.src = event.target.dataset.source;
    lightBoxImage.alt = event.target.alt;
    lightBox.classList.add('is-open');
  
    lightBoxOverlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', handleKeyPress);
  }

// Функіця закриття модального вікна
function closeModal () {
  lightBox.classList.remove('is-open');
  lightBoxImage.src = '';
  lightBoxImage.alt = '';

  lightBoxOverlay.removeEventListener('click', closeModal);

  window.removeEventListener('keydown', handleKeyPress);
}


function handleKeyPress(event) {
  if (event.code === 'ArrowLeft') {
    // Перегортування до попереднього зображення
    const currentIndex = findCurrentIndex();
    const newIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    changeImage(newIndex);
  } else if (event.code === 'ArrowRight') {
    // Перегортування до наступного зображення
    const currentIndex = findCurrentIndex();
    const newIndex = currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    changeImage(newIndex);
  } else if (event.code === 'Escape') {
    // Закриття модального вікна при натисканні клавіші "Escape"
    closeModal();
  }
}

// Знайти індекс поточного зображення
function findCurrentIndex() {
  return galleryItems.findIndex(item => item.original === lightBoxImage.src);
}

// Змінити зображення в модальному вікні за індексом
function changeImage(newIndex) {
  lightBoxImage.src = galleryItems[newIndex].original;
  lightBoxImage.alt = galleryItems[newIndex].description;
}

galleryList.addEventListener('click', openModal);
lightBoxCloseButton.addEventListener('click', closeModal);




