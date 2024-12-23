from rest_framework.exceptions import PermissionDenied

EXCEPTION_USER_PROFILE = ValueError(
    "Профиль пользователя отсутствует"
)

EXCEPTION_USER_CONFLICT_UPDATE = PermissionDenied(
    "Вы можете обновить только свой собственный профиль."
)

EXCEPTION_USER_CONFLICT_CREATE = PermissionDenied(
    "Профиль пользователя уже существует."
)
