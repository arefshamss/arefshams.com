add_filter('authenticate', function ($user, $username, $password) {

    $lang = function_exists('pll_current_language') ? pll_current_language() : 'en';

    $login_page = match ($lang) {
        'fa' => home_url('/fa/login/'),
        'ar' => home_url('/ar/login/'),
        default => home_url('/login/'),
    };

    if (empty($username) || empty($password)) {
        wp_redirect($login_page . '?login=empty');
        exit;
    }

    if (is_wp_error($user)) {
        wp_redirect($login_page . '?login=failed');
        exit;
    }

    return $user;

}, 30, 3);