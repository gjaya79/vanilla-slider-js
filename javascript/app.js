MainCarousel = function(opts){
  this.holder = document.createElement('div');
  this.holder.className = 'mainCarousel001';
  this.opts = this.setDefaults(opts)
  this.loadAnimation();

  window.addEventListener("resize", this.loadAnimation.bind(this), false);
}

MainCarousel.prototype.setDefaults = function(opts){
  opts = opts || {};
  opts.slider_container = opts.slider_container || 'slider';
  opts.slide = opts.slide || 'slide';
  opts.width = opts.width || 270;
  opts.height = opts.height || 115;
  opts.activeClass = opts.activeClass || 'active';
  opts.disabledClass = opts.disabledClass || 'disabled';
  opts.navClass = opts.navClass || 'nav';
  opts.elementClass = opts.elementClass || 'element';

  return opts;
}

MainCarousel.prototype.loadAnimation = function(){
  var grid = document.getElementsByClassName('column-right');
  this.opts.height = grid[0].offsetHeight;

  var columnLeft = document.getElementsByClassName('column-left');
  this.opts.width = columnLeft[0].offsetWidth;

  this.easeOutSlider(this.opts);
}

MainCarousel.prototype.addNavigation = function(classes, gallery, inc) {
  var navEl = document.createElement('div');

  if(typeof classes === 'string') {
    var classList = classes.split(' ');
    for(var iClass = classList.length - 1; iClass >= 0; iClass--) {
      navEl.classList.add(classList[iClass]);
    }
  }

  navEl.addEventListener('click', (function(gallery, inc, activeClass, disabledClass, navClass, elementClass) {
    return function(event) {
      if(!event.target.classList.contains(disabledClass)) {
        var elements = gallery.getElementsByClassName(elementClass);
        for(var iElement = elements.length - 1; iElement >= 0; iElement--) {
          if(elements[iElement].classList.contains(activeClass)) {
            elements[iElement].classList.remove(activeClass);
            elements[iElement+inc].classList.add(activeClass);
            if(iElement+inc !== (elements.length - 1) || iElement+inc !== 0) {
              var navs = event.target.parentNode.getElementsByClassName(navClass);
              navs[0].classList.remove(disabledClass);
              navs[1].classList.remove(disabledClass);
            }
            if(iElement+inc === (elements.length - 1) || iElement+inc === 0) {
              event.target.classList.add(disabledClass);
            }
            break;
          }
        }
      }
    }
  })(gallery, inc, this.opts.activeClass, this.opts.disabledClass, this.opts.navClass, this.opts.elementClass), false);

  return navEl;
};

MainCarousel.prototype.sliderSetBackground = function(opts) {
  opts.elementClass = opts.elementClass || 'element';
  opts.slide = opts.slide || 'gallery';

  var gallery = document.getElementsByClassName(opts.slide);
  var elements = gallery[0].getElementsByClassName(opts.elementClass);
  for(var iElement = elements.length - 1; iElement >= 0; iElement--) {
    var imageDiv = elements[iElement].getElementsByClassName('image');
    var image = imageDiv[0].getElementsByTagName('img');

    content = elements[iElement].getElementsByClassName('content');
    elements[iElement].style.backgroundImage = "url('" + image[0].src + "')";
    elements[iElement].style.width = opts.width + 'px';
    elements[iElement].style.height = opts.height + 'px';

    // Center Content vertically
    content[0].style.top = (elements[iElement].offsetHeight / 2 - content[0].offsetHeight / 2) + 'px';
  }
};

MainCarousel.prototype.easeOutSlider = function(opts) {

  this.sliderSetBackground(opts);
  var sliders = document.getElementsByClassName(opts.slider_container);
  var gallery = document.getElementsByClassName(opts.slide);
  var leftRight = ['right', 'left'];
  for (var iSlide = sliders.length - 1; iSlide >= 0; iSlide--) {
    var slider = sliders[iSlide];
    for(var jNav = 1; jNav >= 0; jNav--) {
      var navEl = this.addNavigation('nav ' + leftRight[jNav], gallery[iSlide], Math.pow(-1, jNav));
      slider.appendChild(navEl).innerText = '^';
    }
    var elements = gallery[iSlide].getElementsByTagName('div');
    elements[((elements.length/2)|0)].classList.add(opts.activeClass);
    sliders[iSlide].style.width = opts.width + 'px';
    sliders[iSlide].style.height = opts.height + 'px';
    gallery[iSlide].style.width = elements.length + '00%';
    gallery[iSlide].style.height = opts.height + 'px';
  }
};


document.addEventListener('DOMContentLoaded', function() {
  var mainCarousel = new MainCarousel();
}, false);
