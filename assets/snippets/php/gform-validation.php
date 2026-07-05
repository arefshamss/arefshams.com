add_filter( 'gform_validation', 'validate_serial_before_submit' );
function validate_serial_before_submit( $validation_result ) {
    global $wpdb;
    $form = $validation_result['form'];
    $table = 'valid_serials';

    $lang = function_exists('pll_current_language') ? pll_current_language() : 'fa';

    $messages = [
        'fa' => ' شماره سریال نامعتبر است.',
        'en' => ' The serial number is invalid.',
        'ar' => ' الرقم التسلسلي غير صالح.',
        'ru' => ' Серийный номер недействителен.',
        'zh' => ' 序列号无效。'
    ];

    $field_id = 6;
    $serial = strtolower( trim( rgpost( "input_{$field_id}" ) ) );

    $exists = $wpdb->get_var( $wpdb->prepare(
        "SELECT COUNT(*) FROM $table WHERE LOWER(serial_number) = %s",
        $serial
    ));

    if ( ! $exists ) {
        foreach ( $form['fields'] as &$field ) {
            if ( $field->id == $field_id ) {
                $field->failed_validation = true;
                $field->validation_message = $messages[$lang];
                $validation_result['is_valid'] = false;
                break;
            }
        }
    }

    $validation_result['form'] = $form;
    return $validation_result;
}