<?php

namespace App\Http\Controllers;

class SpaController extends Controller
{
  /**
   * Show the SPA Template.
   *
   * @return \Illuminate\Contracts\Support\Renderable
   */
  public function index()
  {
    return view('spa');
  }
}
