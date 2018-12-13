<?php

function adjust_width_block(){
    if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

    // Scripts.
    wp_register_script(
        'adjust-width-block-script',
        get_template_directory_uri() . '/blocks/widthAdjust/block.js',
        array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ),
        filemtime(get_stylesheet_directory() . '/blocks/widthAdjust/block.js'),
        true
    );

    // Styles.
    wp_register_style(
        'adjust-width-block-editor-style',
        get_template_directory_uri() . '/blocks/widthAdjust/editor.css',
        array( 'wp-edit-blocks' ),
        filemtime(get_stylesheet_directory() . '/blocks/widthAdjust/editor.css')
    );

    wp_register_style(
        'adjust-width-block-frontend-style',
        get_template_directory_uri() . '/blocks/widthAdjust/style.css',
        array(),
        filemtime(get_stylesheet_directory() . '/blocks/widthAdjust/editor.css')
    );

    wp_enqueue_style(
        'adjust-width-block-fontawesome',
        get_template_directory_uri( 'font-awesome.css', __FILE__ ),
        array(),
        '4.7.0'
    );

    register_block_type( 'wa/block', array(
		'editor_script' => 'adjust-width-block-script',
		'editor_style'  => 'adjust-width-block-editor-style',
		'style'         => 'adjust-width-block-frontend-style',
	) );

}
add_action( 'init', 'adjust_width_block' );
