<?php get_header(); ?>

<div class="container">
    <div class="row">
        <?php if(have_posts()): ?>
            <?php while(have_posts()): the_post();?>
                <div class="col-12">
                    <h1><?php the_title(); ?></h1>
                </div>

                <div class="col-12">
                    <?php the_content(); ?>
                </div>
            <?php endwhile; ?>
        <?php endif; ?>
    </div>
</div>


<?php get_footer(); ?>
