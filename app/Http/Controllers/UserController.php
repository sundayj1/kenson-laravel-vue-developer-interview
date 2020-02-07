<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests\AjaxRequest;

class UserController extends Controller
{
  /**
   * Handle Contact Form Submit
   * @param  AjaxRequest  $request
   * @return Response
   */
  public function contact(AjaxRequest $request)
  {
    // Retrieve the validated input data...
    $validated = (object) $request->validated();

    // This returns and StdClass of inputted info... We an proceed to insert into database if we so desired
    // E.g
    //"object(stdClass)#246 (5) {
    // ["name"]=>
    // string(4) "John Doe"
    // ["email"]=>
    // string(14) "johndoe@gmail.com"
    // ["phone"]=>
    // string(14) "(123) 456-7899"
    // ["address"]=>
    // string(5) "New York..."
    // ["zip_code"]=>
    // string(5) "13245"
    // }
    // {}"

    $User = User::create([
      'name'      => $validated->name,
      'email'     => $validated->email,
      'phone'     => $validated->phone,
      'address'   => $validated->address,
      'zip_code'  => $validated->zip_code
    ]);

    // has attachment
    if( request()->hasFile('attachment') )
    {
      $files      = request()->file('attachment');
      $attachments = [];
      foreach($files as $file)
      {
        $attachments[] = $file->getClientOriginalName() . "." .  $file->getClientOriginalExtension();
        $file->store('attachments');
      }

      $User->attachment = json_encode($attachments);

      $file->store('attachments');

      $User->update();
    }

    return response()->json($validated);
  }
}
