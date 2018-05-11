/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Welcome from './Welcome';
import App from '../src/App';

storiesOf('Welcome', module).add('to Storybook', () => ({
  components: { Welcome },
}));

storiesOf('Menu', module)
  .add('menu', () => ({
    components: { App },
    template: '<app />',
  }));

  // .add('with JSX', () => ({
  //   components: { MyButton },
  //   render() {
  //     return <my-button onClick={this.action}>With JSX</my-button>;
  //   },
  //   methods: { action: linkTo('clicked') },
  // }))
  // .add('with some emoji', () => ({
  //   components: { MyButton },
  //   template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
  //   methods: { action: action('clicked') },
  // }));

/* eslint-enable react/react-in-jsx-scope */
