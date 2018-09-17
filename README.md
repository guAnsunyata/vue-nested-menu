# vue-nested-menu [![Version](https://img.shields.io/npm/v/vue-nested-menu.svg)](https://www.npmjs.com/package/vue-nested-menu)
A simple hands-on mobile nested menu UI component with a smooth slide animation.

[demo](https://guansunyata.me/guansunyata/vue-nested-menu)


## Installation

#### Yarn / NPM

```console
$ yarn add vue-nested-menu
```

*main.js*

```javascript
import VueNestedMenu from 'vue-nested-menu';

Vue.use(VueNestedMenu);
```


## Usage

#### Basic
*index.html*
```html
<div id="app">
  <vue-nested-menu :source="menu"></vue-nested-menu>
</div>
```

*main.js*
```js
import VueNestedMenu from 'vue-nested-menu';

Vue.use(VueNestedMenu)

new Vue({
  el: '#app',
  data: {
    menu: {
      title: '首頁',
      children: [
        {
          title: `Today's Deals`,
          link: `/today`,
          children: [],
        },
        {
          title: `Shop By Department`,
          children: [
            {
              title: `Amazon Music`,
              link: `/music`,
              children: [],
            },
            {
              title: `CDs and Vinyl`,
              link: `/cds`,
              children: [],
            },
          ],
        },
      ],
    },
  },
});

```

#### Single File Component
*app.js*
```js
import VueNestedMenu from 'vue-nested-menu';

Vue.use(VueNestedMenu);

// ...
```

*MyMenu.vue*
```html
<template>
  <vue-nested-menu :source="menu" />
</template>

<script>
export default {
  data() {
    return {
      menu: {
        // your menu data
      },
    };
  },
};
</script>
```

## Styling
You can use following classes for your own customizations

*default style*
```scss

.Menu__header {
    display: flex;
    align-items: center;
    padding-left: 35px;
    height: 50px;
    color: #fff;
    font-size: 16px;
    background-color: #232f3e;
    cursor: pointer;

    .arrow {
        padding-top: 2px;
        fill: #fff;
        margin-right: 10px;
        width: 10px;
        height: 100%;
        display: flex;
        align-items: center;
    }
}

.Menu__list {
    list-style: none;
    padding-bottom: 2px;

    .separator {
        border-bottom: 1px solid #d5dbdb;
        padding: 2px 0 0 0;
        margin: 0;
    }
}

.Menu__item {
    color: #4a4a4a;
    padding-left: 35px;
    height: 45px;
    display: flex;
    align-items: center;
    cursor: pointer;

    a {
        color: #4a4a4a;
        text-decoration: none;
    }

    .arrow {
        padding-top: 2px;
        padding-left: 15px;
        display: flex;
        align-items: center;
        width: 10px;
        height: 100%;
    }
}
```
