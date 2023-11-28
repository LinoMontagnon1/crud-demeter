import firebase_admin
from firebase_admin import credentials, firestore
from faker import Faker
import random

class SQL:
    def __init__(self):
        cred = credentials.Certificate("demeter_firebase_key.json")
        firebase_admin.initialize_app(cred)
        self.db = firestore.client() 

    def create(self, dataset):
        document_id = f"{random.randint(100000, 999999)}_createTest"
        self.db.collection('produtores').document(document_id).set(dataset)

        return True

    def read(self):
        docs_obj = self.db.collection('produtores').get()
        docs = [{doc.id: doc.to_dict()} for doc in docs_obj]

        return docs

    def update(self, doc_id, dataset):
        self.db.collection('produtores').document(doc_id).update(dataset)
        
        return True

    def delete(self, doc_id):
        self.db.collection('produtores').document(doc_id).delete()
        
        return True

firebase = SQL()


# ========== POPULAR BANCO DE DADOS ========== #
# fake = Faker()

# for _ in range(10):
#     dataset = {
#         'bairroDistrito': fake.city(),
#         'cep': fake.zipcode(),
#         'cidade': fake.city(),
#         'cnpj': fake.random_number(digits=14),
#         'email': fake.email(),
#         'endereco': fake.address(),
#         'inscricaoEstadual': fake.random_number(digits=9),
#         'nome': fake.company(),
#         'telefone': fake.phone_number(),
#         'uf': fake.state_abbr(),
#     }

#     firebase.create(dataset)