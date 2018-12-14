<?php

function adjust_width_block(){
    if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
    
    //Width Adjust Block
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
        filemtime(get_stylesheet_directory() . '/blocks/widthAdjust/style.css')
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






    // Scripts.
	wp_register_script(
		'organic-profile-block-script', // Handle.
		get_template_directory_uri() . '/blocks/alternateCards/block.js',
		array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ), // Dependencies, defined above.
        filemtime(get_stylesheet_directory() . '/blocks/alternateCards/block.js'),
		true
	);

	// Styles.
	wp_register_style(
		'organic-profile-block-editor-style', // Handle.
		get_template_directory_uri() . '/blocks/alternateCards/editor.css',
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
        filemtime(get_stylesheet_directory() . '/blocks/alternateCards/style.css')
	);
	wp_register_style(
		'organic-profile-block-frontend-style', // Handle.
		get_template_directory_uri() . '/blocks/alternateCards/style.css',
		array(), // Dependency to include the CSS after it.
		filemtime(get_stylesheet_directory() . '/blocks/alternateCards/style.css')
	);

	// Here we actually register the block with WP, again using our namespacing.
	// We also specify the editor script to be used in the Gutenberg interface.
	register_block_type( 'profile/block', array(
		'editor_script' => 'organic-profile-block-script',
		'editor_style'  => 'organic-profile-block-editor-style',
		'style'         => 'organic-profile-block-frontend-style',
	) );







}
add_action( 'init', 'adjust_width_block' );
