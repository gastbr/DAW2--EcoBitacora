<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bolo>
 */
class BoloFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = \App\Models\Bolo::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'composter_id' => \App\Models\Composter::pluck('id')->random(),
        ];
    }
}
