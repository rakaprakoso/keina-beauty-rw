<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCommissionPercentageToSales extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Deprecated
        Schema::table('sales_levels', function (Blueprint $table) {
            $table->float('commission')->nullable();
            $table->float('affiliate_commission')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sales_levels', function (Blueprint $table) {
            $table->dropColumn('commission');
            $table->dropColumn('affiliate_commission');
        });
    }
}
