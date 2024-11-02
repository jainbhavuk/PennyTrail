from rest_framework import generics
from .serializers import ExpenseSerializer
from .models import Expense

# View For Getting The List Of Expenses + Create A New Expense (GET + POST)
class ExpenseListCreateView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

# View For Updating The Expense + Deleting The Expense (PUT + DELETE)
class ExpenseUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer