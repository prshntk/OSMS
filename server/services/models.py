from django.db import models
from django.utils import timezone

class Batch(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Student(models.Model):
    name = models.CharField(max_length=255, db_index=True)
    father = models.CharField(max_length=255)
    mother = models.CharField(max_length=255)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)
    contact = models.CharField(max_length=255)
    age = models.IntegerField()
    GENDERS = (('M', 'Male'), ('F', 'Female'), ('O', 'Other'))
    gender = models.CharField(max_length=6, choices=GENDERS)
    address = models.CharField(max_length=2048)

    def __str__(self):
        text = self.name + ", " + self.father + ", " + self.mother + ", " + str(self.batch) + ", " + self.contact + ", " + str(self.age) + ", " + self.gender + ", " + self.address
        return text

class Fee(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    installments = models.IntegerField()
    amountPerInst = models.IntegerField()
    paidInst = models.IntegerField()

    def __str__(self):
        return str(self.student)

class Course(models.Model):
    name = models.CharField(max_length=255)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)

    def __str__(self):
        return (str(self.batch) + " " + self.name) 

class Grades(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.IntegerField(default=10)

    def __str__(self):
        return (str(self.student) + ", " + str(self.course) + ": " + str(self.grade))
