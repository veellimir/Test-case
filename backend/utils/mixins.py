class ModelToStrMixin:
    def __str__(self) -> str:
        if hasattr(self, "title"):
            return str(self.title)
        if hasattr(self, "user"):
            return str(self.user.username)
        return super().__str__()