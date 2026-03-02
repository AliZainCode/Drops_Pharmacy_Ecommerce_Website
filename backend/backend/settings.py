from pathlib import Path
import os
from dotenv import load_dotenv

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env file
load_dotenv(os.path.join(BASE_DIR, ".env"))

# SECURITY
SECRET_KEY = os.getenv("SECRET_KEY")

DEBUG = os.getenv("DEBUG") == "True"

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",")


# APPLICATIONS
INSTALLED_APPS = [
    "corsheaders",

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    "import_export",

    # project apps
    "products",
    "herosection",
    "branchslider",
    "brands",
    "categories",
    "contact",
    "footer",
    "payment",
]


# MIDDLEWARE
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "backend.urls"


# TEMPLATES
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "backend.wsgi.application"


# DATABASE
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        "PORT": os.getenv("DB_PORT"),
    }
}


# PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# INTERNATIONALIZATION
LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# STATIC FILES
STATIC_URL = "static/"


# CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://dropspharmc.netlify.app",
]


# STRIPE
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")


# DEFAULT PRIMARY KEY
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CSRF_TRUSTED_ORIGINS = [
    "https://dropspharmc.netlify.app",
]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"