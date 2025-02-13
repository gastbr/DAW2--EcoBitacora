<x-guest-layout>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {{ __('¿Has olvidado tu contraseña? No te preocupes. Danos tu correo electrónico y te enviaremos un enlace para que puedas restablecerla.') }}
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Correo electrónico')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4 gap-2">
            <x-primary-button>
                {{ __('Enviar enlace') }}
            </x-primary-button>
            <a href=" {{ url()->previous() }}">
                <x-secondary-button>
                    {{ __('Volver') }}
                </x-secondary-button>
            </a>
        </div>
    </form>
</x-guest-layout>