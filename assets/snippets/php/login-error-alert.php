add_shortcode('login_error_alert', function () {

    if (!isset($_GET['login'])) return '';

    $lang = function_exists('pll_current_language') ? pll_current_language() : 'en';

    if ($_GET['login'] === 'failed') {
        return match ($lang) {
            'fa' => '<div class="login-alert error">نام کاربری یا رمز عبور اشتباه است.</div>',
            'ar' => '<div class="login-alert error">اسم المستخدم أو كلمة المرور غير صحيحة.</div>',
            default => '<div class="login-alert error">Invalid username or password.</div>',
        };
    }

    if ($_GET['login'] === 'empty') {
        return match ($lang) {
            'fa' => '<div class="login-alert warning">لطفاً نام کاربری و رمز عبور را وارد کنید.</div>',
            'ar' => '<div class="login-alert warning">يرجى إدخال اسم المستخدم وكلمة المرور.</div>',
            default => '<div class="login-alert warning">Please enter your username and password.</div>',
        };
    }

    return '';
});