Q(document).ready(function () {
    injectMarkup();
    initSidebar();
    initGuestbook();
    initPopover();
    fairyDustCursor();
    Q("body").removeClass("theme-dark");
});

function injectMarkup() {
    if (Q("#content").css('backgroundColor') === 'rgba(0, 0, 0, 0)' && Q("body").css('backgroundColor') !== 'rgba(0, 0, 0, 0)') {
        Q("#content").css('backgroundColor', Q("body").css('backgroundColor'));
    }

    // Header
    var _h = '';
    _h += '<div id="tm-header" class="bg-black-900 ta-center py24 overflow-hidden">';
    _h += '<div id="tm-scroll">';
    _h += '<img src="https://i.stack.imgur.com/TFzLS.gif" alt="Welcome to Stack Overflow" />';
    _h += '</div>';
    _h += '</div>';
    Q("body").prepend(_h);

    // Unicorns?
    Q("#left-sidebar").prepend('<img class="tm-unicorn-front" src="https://i.stack.imgur.com/lrSWK.png" alt="UNI..."/>');
    Q(".container").append('<img class="tm-unicorn-back" src="https://i.stack.imgur.com/Pe85Z.png" alt="...CORN"/>');

    // Left sidebar link
    var _l = '';
    _l += '<div class="w100 ta-center fc-white ff-comic mt32">';
    _l += '<img class="w100 mb24" src="https://i.stack.imgur.com/1c2Mk.png" />';
    _l += '<p class="tt-uppercase fw-bold fs3 mb24">~Under Construction~</p>';
    _l += '<p class="mb0">Big changes for Y2K!</p>';
    _l += '<a href="#" class="js-tm-sidebar-toggle s-btn s-btn__primary d-inline-block fc-white td-none mt24">Go to the future</a>';
    _l += '<img class="w100 mt24" src="https://i.stack.imgur.com/1c2Mk.png" />';
    _l += '</div>';
    Q("#left-sidebar nav").append(_l);

    // View Counter
    var __3 = Q("#qinfo tr:nth-child(2) td:last-child .label-key b").text();
    console.log(__3);
    var __6 = __3.split(" ");
    var __9 = '<span id="tm-views">' + __6[0].replace(/,/g, "") + '</span> ' + __6[1];
    Q("#qinfo tr:nth-child(2) td:last-child b").html(__9);

    var _f = ''; // Injected footer
    _f += '<div id="tm-footer">';
    _f += '<div id="tm-footer-top"></div>';
    _f += '<h1 class="ta-center"><img class="wmx100" src="https://i.stack.imgur.com/UtpOa.png" alt="Guestbook"></h1>';
    _f += '<div class="grid mx-auto wmx8 ff-comic fc-white md:fd-column">';
    _f += '<div class="js-tm-form-container tm-form-container grid--cell5 grid--cell12 p12 fc-white">';
    _f += '<form id="js-tm-form">';
    _f += '<p class="mb4"><label for="guestbook-name">Name:</label></p>';
    _f += '<input class="js-tm-name-input mb16 w100" type="text" name="guestbook-name" required />';
    _f += '<p class="mb4"><label for="guestbook-name">Comment:</label></p>';
    _f += '<textarea class="js-tm-comment-input w100 hs1 mb16" name="guestbook-comment" required></textarea>';
    _f += '<input id="js-tm-submit" class="w100" type="submit" value="Sign our guestbook!" />';
    _f += '</form>';
    _f += '</div>';
    _f += '<div class="js-tm-comments tm-comments grid--cell7 grid--cell12 p12 overflow-y-scroll bg-white">';
    _f += '</div>';
    _f += '</div>';
    _f += '<div id="tm-footer-bottom"></div>';
    _f += '</div>';
    Q("#footer").prepend(_f);

    // Site footer
    Q(".site-footer--copyright p")
        .before('<p class="fw-bold fc-white mb0 ff-comic fs-body1">Proudly built in Notepad</p>')
        .after('<p class="fw-bold fc-white ff-comic tt-uppercase fs-body1">Best viewed in <img class="d-inline-block" src="https://i.stack.imgur.com/9e5RT.png" alt="Netscape 3.0"></p>');


    // Gif injections
    var globe = '<img src="https://i.stack.imgur.com/Txh9N.gif" class="tm-globe" />';
    Q("svg.svg-icon.iconGlobe").before(globe).remove();

    var yourAnswer = Q("#post-form > .space");
    if (yourAnswer.length) {
        var answer_img = '<img src="https://i.stack.imgur.com/2TdH8.png" alt="Your Answer" />';
        yourAnswer.html(answer_img);
    }

    var $hnqHeadline = Q("#hot-network-questions h4");
    if ($hnqHeadline.length) {
        var flame = '<img src="https://i.stack.imgur.com/74roz.gif" class="tm-fire" />';
        $hnqHeadline.append(flame).prepend(flame);
    }

    if (document.querySelector(".js-cursor-container") == null) {
        Q("<span>").addClass("js-cursor-container").prependTo("#content > div");
    }
}

function initSidebar() {
    Q(".js-tm-sidebar-toggle").click(function (e) {
        e.preventDefault();
        se.helpers.showFancyOverlay({ message: "To return to the future, disable the \"Stack Exchange 90's Theme\" userscript." });
    })
}

function initGuestbook() {
    populateGuestbook();
    bindGuestbook();

    // Randomly add items
    setInterval(function () {
        if (Math.floor(Math.random() * 3) === 0) {
            addRandomComment();
        }
    }, 300);
}

function initPopover() {
    var $popover = Q(".js-toggle-popover");
    setTimeout(function () {
        $popover.insertBefore(".js-time-machine-button").removeClass("d-none").addClass("is-visible");
    }, 1000 * 4);

    Q(document).on("click touchstart", ".js-time-machine-button, .js-toggle-popover-close", function () {
        $popover.remove();
        $.cookie("tm2019d", "1", { path: '/', expires: 2 });
    });
}

function populateGuestbook() {
    for (var i = 0; i < 10; i++) {
        addRandomComment();
    }
}

function bindGuestbook() {
    Q("#js-tm-form").submit(function (e) {
        e.preventDefault();

        var $name = Q(".js-tm-name-input");
        var $comment = Q(".js-tm-comment-input");

        if ($name.val().length === 0 || $comment.val().length === 0) return;

        addComment($name.val(), $comment.val());

        $name.val(null);
        $comment.val(null);
    })
}

function addRandomComment() {
    var names = [
        "adam",
        "jane",
        "meg",
        "jon",
        "josh",
        "lisa",
        "brian"
    ];
    var comments = [
        "Is this an April Fool's joke?",
        "this is for april 1",
        "april fools :)",
        "Where's the webring? :(",
        "check out this song! http://myspace.com/soeb__42345",
        "FIIIIIIIRRRSSSSTTTTTTT",
        "...",
        "lol",
        "lol jk",
        "testing.",
        "the unicorns are genius",
        "did they kill sparkles???",
        "fireballs would have been better",
        "I forgot about <marquee> lol",
        "<marquee> !!!",
        "What about <blink>?",
        "testing...",
        "test test test",
        "does this wor",
        "OMG HAHAHA",
        "omg",
        "heh.",
        "hehehe",
        "I think they got haxxxed",
        "There are so many better things for the devs to do.",
        "I guess it's April :P",
        "f",
        "it's almost Y2K!!!",
        "what browser are you using?",
        "netscape 4.05",
        "ff",
        "DHTML!",
        "Flash"
    ];

    addComment(names[Math.floor(Math.random() * names.length)], comments[Math.floor(Math.random() * comments.length)])
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function addComment(name, comment) {

    var content = '<div class="ff-comic fc-fuschia bb bbw2 bc-black-3 fs-body3 p12">';
    content += '<p class="mb4">' + escapeHtml(comment) + '</p>';
    content += '<p class="tm-comment-info ff-times fs-caption">@' + escapeHtml(name) + ' - 2019/04/01</p>'
    content += '</div>';

    Q(".js-tm-comments").prepend(content);
}

/*!
 * Fairy Dust Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- https://codepen.io/tholman/full/jWmZxZ/
 */

function fairyDustCursor() {
  
  var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
  var width = window.innerWidth;
  var height = window.innerHeight;
  var cursor = {x: width/2, y: width/2};
  var particles = [];
  
  function init() {
    bindEvents();
    loop();
  }
  
  // Bind events that are needed
  function bindEvents() {
    Q(document).on('mousemove', onMouseMove);
    Q(document).on('touchmove', onTouchMove);
    Q(document).on('touchstart', onTouchMove);
    
    Q(window).on('resize', onWindowResize);
  }
  
  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  
  function onTouchMove(e) {
    if( e.touches.length > 0 ) {
      for( var i = 0; i < e.touches.length; i++ ) {
        addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleColors[Math.floor(Math.random()*possibleColors.length)]);
      }
    }
  }
  
  function onMouseMove(e) {    
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    
    addParticle( cursor.x, cursor.y, possibleColors[Math.floor(Math.random()*possibleColors.length)]);
  }
  
  function addParticle(x, y, color) {
    var particle = new Particle();
    particle.init(x, y, color);
    particles.push(particle);
  }
  
  function updateParticles() {
    
    // Updated
    for( var i = 0; i < particles.length; i++ ) {
      particles[i].update();
    }
    
    // Remove dead particles
    for( var i = particles.length -1; i >= 0; i-- ) {
      if( particles[i].lifeSpan < 0 ) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
    
  }
  
  function loop() {
    requestAnimationFrame(loop);
    updateParticles();
  }
  
  /**
   * Particles
   */
  
  function Particle() {

    this.character = "*";
    this.lifeSpan = 120; //ms
    this.initialStyles ={
      "position": "absolute",
      "display": "block",
      "pointerEvents": "none",
      "z-index": "10000000",
      "fontSize": "16px",
      "will-change": "transform"
    };

    // Init, and set properties
    this.init = function(x, y, color) {

      this.velocity = {
        x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: 1
      };
      
      this.position = {x: x - 10, y: y - 20};
      this.initialStyles.color = color;

      this.element = Q('span');
      this.element.innerHTML = this.character;
      this.element.css(this.initialStyles)
      // applyProperties(this.element, this.initialStyles);
      this.update();
      
      Q('.container').append(this.element);
    };
    
    this.update = function() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;
      
      this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
    }
    
    this.die = function() {
      // this.element.parentNode.removeChild(this.element);
      this.element.parentNode.remove(this.element);
    }
    
  }
  
  /**
   * Utils
   */
  
  // Applies css `properties` to an element.
  // function applyProperties( target, properties ) {
  //   for( var key in properties ) {
  //     target.style[ key ] = properties[ key ];
  //   }
  // }
  
  init();
};

