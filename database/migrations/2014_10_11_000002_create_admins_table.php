<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('name');
            $table->string('password');
            $table->biginteger('role')->unsigned()->nullable();
            $table->foreign('role')->references('id')->on('admin_role')->onDelete('cascade');
            $table->string('sales_code')->nullable()->unique();
            $table->biginteger('sales_level')->unsigned()->nullable();
            $table->foreign('sales_level')->references('id')->on('sales_levels')->onDelete('cascade');
            $table->string('sales_parent')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
