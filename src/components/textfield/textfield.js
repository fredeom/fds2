import * as jQuery from 'jquery';
import 'jquery.maskedinput/src/jquery.maskedinput';
//import "jquery-mask-plugin"; // "jquery-mask-plugin": "^1.14.16",
// new webpack.ProvidePlugin({
//   $: "jquery",
//   jQuery: "jquery",
//   mask: "jquery-mask-plugin",
// }),

jQuery('.text_field_masked').each(function () {
  jQuery(this).mask(this.getAttribute('data-mask'));
});