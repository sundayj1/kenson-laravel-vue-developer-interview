<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AjaxRequest extends FormRequest
{
  /**
   * Get the validator instance for the request.
   * @param $factory \Illuminate\Validation\Factory
   * @return \Illuminate\Validation\Validator
   */
  public function validator($factory)
  {
    return $factory->make( $this->all(), $this->rules() );
  }

  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return config('app.rules');
  }
}
