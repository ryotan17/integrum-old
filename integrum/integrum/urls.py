"""integrum URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from chat.urls import router as chat_router
from account.urls import router as account_router

from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view

schema_view = get_schema_view(title='Integrum API')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chat/', include(chat_router.urls)),
    path('api/account/', include(account_router.urls)),
    path('docs/', include_docs_urls(title='Integrum API')),
    path('schema/', schema_view),
]
