# Meld

Meld is a javascript library for unobtrusive "templating".
Meld runs on server-side with nodejs (jsdom+jquery) and on browsers (jquery).

Prompted by weld.js. Syntax by hquery.

## Example

### 1. Given a clean webpage

    <!-- PAGE.HTML -->
    <ul class="contacts">
      <li class="contact">
        <h1 class="name">Person's name</h1>
          <ul>
            <li class='title'>A job this person does</li>
          </ul>
      </li>
      <li class="contact">
        <h1 class="name">Another person</h1>
          <ul>
            <li class='title'>another job</li>
          </ul>
      </li>
    </ul>

### 2. Add jQuery, Meld, and your data as javascript object literals.

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
    <script src="meld.js"></script>
    <script>
      var data = [{ name: "hij1nx",   title : "code slayer" },
                  { name: "tmpvar",   title : "code pimp" },
                  { name: "choonkeat", title: "coder"}];
    </script>

### 3. Option 1. Use the built-in renderer
    <script>
      meld('.contacts .contact', data);
    </script>

to produce

    <ul class="contacts">
      <li class="contact">
        <h1 class="name">hij1nx</h1>
          <ul>
            <li class="title">code slayer</li>
          </ul>
      </li><li class="contact">
        <h1 class="name">tmpvar</h1>
          <ul>
            <li class="title">code pimp</li>
          </ul>
      </li><li class="contact">
        <h1 class="name">choonkeat</h1>
          <ul>
            <li class="title">coder</li>
          </ul>
      </li>
    </ul>

### 4. Option 2. Custom renderer function
    <style>.zebra-0 { background: #ccc; }</style>
    <script>
      meld('.contacts .contact', data, function(index, ele, row) {

          // update "innerHTML"s...
          ele.find('.name').text(row.name);
          ele.find('.title').text(row.title);

          // or work with attributes
          ele.find('.name')[0].title = "His name is " + row.name
          ele.addClass('zebra-' + (index % 2));

      });
    </script>

to produce

    <ul class="contacts">
      <li class="contact zebra-0">
        <h1 class="name" title="His name is hij1nx">hij1nx</h1>
          <ul>
            <li class="title">code slayer</li>
          </ul>
      </li><li class="contact zebra-1">
        <h1 class="name" title="His name is tmpvar">tmpvar</h1>
          <ul>
            <li class="title">code pimp</li>
          </ul>
      </li><li class="contact zebra-0">
        <h1 class="name" title="His name is choonkeat">choonkeat</h1>
          <ul>
            <li class="title">coder</li>
          </ul>
      </li>
    </ul>

## References

http://blog.choonkeat.com/weblog/2008/10/hquery-an-unobtrusive-server-script-implementation.html
https://github.com/choonkeat/hquery
https://github.com/hij1nx/weld

## License

Meld is released under the MIT license.

## Author

Chew Choon Keat <choonkeat at gmail>
http://choonkeat.com/

20 February 2011
