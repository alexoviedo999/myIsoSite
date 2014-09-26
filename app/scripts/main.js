$( function() {
  // init Isotope
  var $container = $('.isotope').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function( itemElem ) {
        var weight = $( itemElem ).find('.weight').text();
        return parseFloat( weight.replace( /[\(\)]/g, '') );
      }
    }
  });

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };

  // bind filter button click
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $container.isotope({ filter: filterValue });
  });

  // bind sort button click
  $('#sorts').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $container.isotope({ sortBy: sortByValue });
  });
  
  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });


function onLinkedInLoad() {
     IN.Event.on(IN, "auth", onLinkedInAuth);
}

function onLinkedInAuth() {
     IN.API.Profile("me").result(displayProfiles);
} 

function displayProfiles(profiles) {
     member = profiles.values[0];
     document.getElementById("profiles").innerHTML = 
          "<p id=\"" + member.id + "\">Hello " +  member.firstName + " " + member.lastName + "</p>";
}

  
});


// Space Canvas

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var DeepSpace = function(size, number, speed) {
  this.size = size;
  this.number = number;
  this.speed = speed;
  this.objects = new Array();

  this.initialize = function()
  {
    this.creationImage();
    this.drawCircle();
    this.animate();
  }

  this.creationImage = function()
  {
    for(var i = 0; i < this.number; i++)
    {
      var star = {
        'x' : Math.random()*2000,
        'y' : Math.random()*900,
        'radius' : Math.random()*this.size+1,
      }
      this.objects.push(star);
    }
  }

  this.drawCircle = function(x, y, radius)
  {
    with(ctx)
    {
      beginPath();
      arc(x, y, radius, 0, 2*Math.PI);
      fillStyle = 'white';
      fill();
      stroke();
      closePath();
    }
  }

  this.animate = function()
  {
    for(var j in this.objects)
    {
      var x = this.objects[j].x--;
      var y = this.objects[j].y;
      var radius = this.objects[j].radius;
      
      if(x < -2) this.objects[j].x = 2000;

      this.drawCircle(x, y, radius);
      
    }
  }
  
  setInterval(this.animate.bind(this), this.speed);
}

var space = new DeepSpace(0.5, 600, 50);
space.initialize();
var space = new DeepSpace(1.3, 180, 30);
space.initialize();
var space = new DeepSpace(1.5, 80, 10);
space.initialize();

