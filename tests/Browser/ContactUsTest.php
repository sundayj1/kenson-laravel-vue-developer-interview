<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class ContactUsTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->browse(function (Browser $browser) {
            $browser
              ->visit('/contact-us')
              ->type('Taylor', 'name')
              ->type('taylor@laravel.com', 'email')
              ->type('(123) 456-7899', 'phone')
              ->type('New York', 'address')
              ->type('61551', 'zip_code')
              ->attach('attachments[]', __DIR__.'/photos/me.png')
              ->press('Submit')
              ->waitForText('Request successful!')
              ->assertSee('Request successful!');
        });
    }
}
