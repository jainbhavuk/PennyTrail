from django.urls import path
from .views import ExpenseListCreateView, ExpenseUpdateDestroyView

urlpatterns = [
    path("", ExpenseListCreateView.as_view(), name="expense-list-create"),
    path("update/<int:pk>", ExpenseUpdateDestroyView.as_view(), name="expense-update-destroy")
]
