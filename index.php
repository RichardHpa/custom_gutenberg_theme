<?php get_header(); ?>
<?php if(have_posts()): ?>
    <?php while(have_posts()): the_post();?>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1><?php the_title(); ?> - <i class="fas fa-bars"></i></h1>
                </div>
            </div>
        </div>
        <div class="">
            <?php the_content(); ?>
        </div>
    <?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>
