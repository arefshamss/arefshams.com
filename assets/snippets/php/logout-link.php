add_shortcode('logout_link', function () {
    $lang = function_exists('pll_current_language') ? pll_current_language() : 'en';

    $redirect = match ($lang) {
        'fa' => home_url('/fa/'),
        'ar' => home_url('/ar/'),
        default => home_url('/'),
    };

    return wp_logout_url($redirect);
});