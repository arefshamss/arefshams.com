add_action('template_redirect', function () {

    if (is_user_logged_in()) {
        return;
    }

    if (!function_exists('pll_current_language')) {
        return;
    }

    if (!is_page('account')) {
        return;
    }

    $lang = pll_current_language();

    $login_url = home_url(
        $lang === 'en' ? '/login/' : "/{$lang}/login/"
    );

    wp_redirect($login_url);
    exit;
});