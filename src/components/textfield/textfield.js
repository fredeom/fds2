import * as jQuery from 'jquery';
import 'jquery.maskedinput/src/jquery.maskedinput';
//import "jquery-mask-plugin";

jQuery('.text_field_masked').each(function () {
  jQuery(this).mask(this.getAttribute('data-mask'));
});