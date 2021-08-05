<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOrderNonUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('nameBuyer')->nullable();
            $table->string('emailBuyer')->nullable();
            $table->string('phoneBuyer')->nullable();
            $table->text('addressBuyer')->nullable();
            $table->text('shippingAddressBuyer')->nullable();
            $table->string('shippingMethod')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('nameBuyer');
            $table->dropColumn('emailBuyer');
            $table->dropColumn('phoneBuyer');
            $table->dropColumn('addressBuyer');
            $table->dropColumn('shippingAddressBuyer');
            $table->dropColumn('shippingMethod');
        });
    }
}
