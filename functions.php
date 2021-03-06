<?php

function addStyleFiles(){
    wp_enqueue_style('bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.min.css', array(), '4.1.3', 'all');
    wp_enqueue_style('custom-style', get_template_directory_uri() . '/assets/css/custom-style.css', array(), '1.0.0', 'all');
    wp_enqueue_style('fontAwesome', get_template_directory_uri() . '/assets/css/all.min.css', array(), '5.6.1', 'all');

    wp_enqueue_script('jquery');
    wp_enqueue_script('bootstrapjs', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array(), '4.1.3', true);

}
add_action('wp_enqueue_scripts', 'addStyleFiles');

function add_admin_custom_styles(){
    wp_enqueue_script('mainjs', get_template_directory_uri() . '/assets/js/main.js', array('wp-api'), '1.0.0', true);
    wp_enqueue_style('fontAwesome', get_template_directory_uri() . '/assets/css/all.min.css', array(), '5.6.1', 'all');
}
add_action('admin_enqueue_scripts', 'add_admin_custom_styles');


require get_parent_theme_file_path('./customizer/custom-blocks.php');
