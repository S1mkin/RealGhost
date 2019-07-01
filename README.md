# realGhost

Touch enabled [jQuery](https://jquery.com/) plugin that lets you create a flying ghost on website.
Only for joke.

## Quick start

1\.  Add latest jQuery and realGhost files

```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<link  href="/path/to/css/jquery.realghost.min.css" rel="stylesheet">
<script src="/path/to/js/jquery.realghost.min.js"></script>
```

2\.  Create button into html page

```html
<button class="goGhost">go Ghost</button>
```

3\.  Add javascript

```javascript
$(document).ready(function(){
  $('.goGhost').on('click', function(){
    $().RealGhost({
      id: 'ghost-1', 
      imageSrc:'/path/to/img/ghost-1.png',
      speed: 1200,
      sound: { path: '/path/to/audio/ghost.mp3', speed: 2.0, volume: 0.2 },
      route: 'bottom-top',
      bouncing: true
    });                        
  });
});
```

4\. Enjoy!
