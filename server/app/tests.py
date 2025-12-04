from django.test import TestCase
from django.db.utils import IntegrityError
from .models import User, Message

class UserModelTests(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(name="alice", password="testpass123")
        self.assertEqual(user.name, "alice")
        self.assertTrue(user.check_password("testpass123"))
        self.assertEqual(user.text_color, "black")
        self.assertEqual(user.text_background, "white")
        self.assertIsNotNone(user.date_created)

    def test_create_user_without_name_raises(self):
        with self.assertRaises(ValueError):
            User.objects.create_user(name=None, password="pass")

    def test_user_str_method(self):
        user = User.objects.create_user(name="bob", password="pass")
        self.assertEqual(str(user), "bob")

    def test_unique_username_constraint(self):
        User.objects.create_user(name="eve", password="pass")
        with self.assertRaises(IntegrityError):
            User.objects.create_user(name="eve", password="pass2")

class MessageModelTests(TestCase):
    def test_message_creation(self):
        user = User.objects.create_user(name="charlie", password="pass")
        message = Message.objects.create(user=user, body="Hello World")
        self.assertEqual(message.user, user)
        self.assertEqual(message.body, "Hello World")
        self.assertIsNotNone(message.date_created)

    def test_message_str_method(self):
        user = User.objects.create_user(name="dave", password="pass")
        message = Message.objects.create(user=user, body="Hi there")
        self.assertEqual(str(message), "dave")