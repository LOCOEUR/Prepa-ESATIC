export const initialModules = [
  // ==========================================
  // SESSION 2025 (ÉPREUVES RÉELLES OFFICIELLES)
  // ==========================================
  {
    id: "session-2025-info",
    track: "info",
    category: "Sujets Officiels 2025",
    professor: "ESATIC - Session 2025",
    title: "Épreuve Spécialité-Info (Session 2025)",
    icon: "Code2",
    color: "from-purple-600 via-indigo-600 to-cyan-500",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    description: "Sujet officiel mot à mot (Durée: 2h30). Ce sujet comporte 06 exercices en 03 pages. Aucun document n'est autorisé.",
    questions: [
      {
        id: "2025-info-ex1",
        title: "Exercice 1 : Algorithme (2 pts)",
        type: "code_written",
        difficulty: "Facile",
        prompt: `Exercice 1 : Algorithme (2 pts)

Écrire une fonction récursive qui permet de calculer la suite suivante :

  U_1 = 1
  U_n = U_{n-1} + N   (tel que N >= 1)`,
        explanation: `En Python :
def suite_u(n):
    if n <= 1:
        return 1
    return suite_u(n - 1) + n

En Pseudo-code :
Fonction suite_u(n : Entier) : Entier
Début
    Si n <= 1 Alors
        Retourner 1
    Sinon
        Retourner suite_u(n - 1) + n
    FinSi
Fin`,
        hint: "Condition d'arrêt si n <= 1 renvoie 1, et l'appel récursif suite_u(n-1) + n."
      },
      {
        id: "2025-info-ex2",
        title: "Exercice 2 : Python algorithmique (3 pts)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 2 : Python algorithmique (3 pts)

Écrire une fonction parcours_bfs(graph: dict, start: int, forbidden: set) -> list qui réalise un parcours en largeur (BFS) dans un graphe orienté représenté par un dictionnaire d'adjacence, en excluant les nœuds interdits.

• Input :
  o graph : dictionnaire où graph[nœud] est la liste des voisins directs.
  o start : nœud de départ.
  o forbidden : ensemble des nœuds interdits.

• Output :
  o Liste ordonnée des nœuds accessibles depuis start (sans doublons), excluant les nœuds interdits.

• Cas limites :
  o Si start est interdit, retourner une liste vide [].
  o Si un voisin est interdit, ne pas le visiter.

Exemple :
graph = {1: [2, 3], 2: [4], 3: [4], 4: []}
parcours_bfs(graph, start=1, forbidden={3})  # Output -> [1, 2, 4]`,
        explanation: `from collections import deque

def parcours_bfs(graph, start, forbidden):
    if start in forbidden or start not in graph:
        return []
    
    visited = set(forbidden)
    queue = deque([start])
    visited.add(start)
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                
    return result`,
        hint: "Utilisez collections.deque() pour popleft() en O(1) et set(forbidden)."
      },

      // EXERCICE 3 : ADRESSAGE IP (ÉNONCÉ DU SUJET ET QUESTION PAR ÉCRAN)
      {
        id: "2025-info-ex3-q1",
        title: "Exercice 3 : Adressage IP (Question 1/5)",
        type: "mcq",
        difficulty: "Moyen",
        prompt: `Exercice 3 : Adressage IP (5 pts)

ÉNONCÉ :
ESATIC-Services exploite deux sites (Abidjan et Yamoussoukro) interconnectés par VPN.
• Bloc IPv4 attribué : 172.30.0.0/20
• Bloc IPv6 attribué : 2001:db8:bf::/48
• Site d'Abidjan - Département IT : 90 postes + 10 serveurs = 100 machines.

--------------------------------------------------
QUESTION 1 :
Pour le LAN IT (100 machines), quel masque IPv4 minimise le gaspillage tout en gardant une marge ?`,
        options: [
          { id: "a", text: "A) /26", isCorrect: false },
          { id: "b", text: "B) /25", isCorrect: true },
          { id: "c", text: "C) /27", isCorrect: false },
          { id: "d", text: "D) /24", isCorrect: false }
        ],
        explanation: "B) /25 offre 126 adresses hôtes utilisables (2^7 - 2 = 126), ce qui couvre 100 machines sans gaspiller les adresses d'un /24.",
        hint: "Le bloc /25 offre 126 adresses utilisables."
      },
      {
        id: "2025-info-ex3-q2",
        title: "Exercice 3 : Adressage IP (Question 2/5)",
        type: "mcq",
        difficulty: "Facile",
        prompt: `Exercice 3 : Adressage IP (5 pts)

ÉNONCÉ :
ESATIC-Services - Site d'Abidjan (Département Finance : 40 postes).
• Réseau Finance attribué : 172.30.6.64/26.

--------------------------------------------------
QUESTION 2 :
Quelle est l'adresse de diffusion du sous-réseau 172.30.6.64/26 (réseau Finance) ?`,
        options: [
          { id: "a", text: "A) 172.30.6.95", isCorrect: false },
          { id: "b", text: "B) 172.30.6.127", isCorrect: true },
          { id: "c", text: "C) 172.30.6.191", isCorrect: false },
          { id: "d", text: "D) 172.30.6.128", isCorrect: false }
        ],
        explanation: "B) 172.30.6.127. Le sous-réseau /26 s'étend de 172.30.6.64 à 172.30.6.127. La dernière adresse (.127) est la diffusion.",
        hint: "64 + 64 - 1 = 127."
      },
      {
        id: "2025-info-ex3-q3",
        title: "Exercice 3 : Adressage IP (Question 3/5)",
        type: "mcq",
        difficulty: "Facile",
        prompt: `Exercice 3 : Adressage IP (5 pts)

ÉNONCÉ :
ESATIC-Services - Plan d'adressage IPv4.

--------------------------------------------------
QUESTION 3 :
Combien d'adresses utilisables contient un bloc /26 ?`,
        options: [
          { id: "a", text: "A) 62", isCorrect: true },
          { id: "b", text: "B) 63", isCorrect: false },
          { id: "c", text: "C) 126", isCorrect: false },
          { id: "d", text: "D) 30", isCorrect: false }
        ],
        explanation: "A) 62 adresses utilisables (2^6 - 2 = 62).",
        hint: "32 - 26 = 6 bits hôtes. 2^6 - 2 = 62."
      },
      {
        id: "2025-info-ex3-q4",
        title: "Exercice 3 : Adressage IP (Question 4/5)",
        type: "mcq",
        difficulty: "Moyen",
        prompt: `Exercice 3 : Adressage IP (5 pts)

ÉNONCÉ IPv6 :
• Bloc IPv6 attribué : 2001:db8:bf::/48
• Règle entreprise : « l'ID-Sous-réseau est égal au numéro de VLAN »
• Réseau Wi-Fi Visiteurs : VLAN 30

--------------------------------------------------
QUESTION 4 :
Quel préfixe IPv6 /64 conviendrait au réseau Wi-Fi Visiteurs ?`,
        options: [
          { id: "a", text: "A. 2001:db8:bf:3::/64", isCorrect: false },
          { id: "b", text: "B. 2001:db8:bf:30::/64", isCorrect: true },
          { id: "c", text: "C. fe80::/64", isCorrect: false },
          { id: "d", text: "D. 2001:db8:bf::30/64", isCorrect: false }
        ],
        explanation: "B. 2001:db8:bf:30::/64.",
        hint: "Le 4ème hextet prend la valeur 30."
      },
      {
        id: "2025-info-ex3-q5",
        title: "Exercice 3 : Adressage IP (Question 5/5)",
        type: "mcq",
        difficulty: "Moyen",
        prompt: `Exercice 3 : Adressage IP (5 pts)

ÉNONCÉ IPv6 :
Autoconfiguration IPv6 sur les commutateurs et hôtes ESATIC-Services.

--------------------------------------------------
QUESTION 5 :
Que se passe-t-il si aucun Router Advertisement (RA) n'est émis dans un réseau IPv6 ?`,
        options: [
          { id: "a", text: "A. Les hôtes obtiennent une GUA aléatoire.", isCorrect: false },
          { id: "b", text: "B. Les hôtes utilisent une ULA fc00::/7.", isCorrect: false },
          { id: "c", text: "C. Les hôtes ne conservent qu'une adresse lien-local fe80::/10.", isCorrect: true },
          { id: "d", text: "D. Les hôtes reçoivent un /128 par DHCPv4.", isCorrect: false }
        ],
        explanation: "C. Sans messages Router Advertisement (RA), les hôtes ne gardent que leur adresse fe80::/10.",
        hint: "SLAAC nécessite les messages RA."
      },

      // EXERCICE 4 : ASSURANCE AUTO (ÉNONCÉ DU SUJET ET QUESTION PAR ÉCRAN)
      {
        id: "2025-info-ex4-q1a",
        title: "Exercice 4 : Assurance Auto (Question 1.a : Entités & Propriétés)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 4 : Gestion d'une assurance automobile (3 pts)

ÉNONCÉ :
Une compagnie d'assurance souhaite gérer les contrats d'assurance automobile de ses clients :
• Un client peut souscrire plusieurs contrats auto ; un contrat est associé à un seul véhicule.
• Un véhicule n'appartient qu'à un seul client à un moment donné.
• Chaque contrat couvre une période donnée (date de début, date de fin).
• La compagnie propose plusieurs types de garanties (vol, incendie, etc.). Un contrat peut inclure plusieurs garanties.
• En cas d'incident, le client déclare un sinistre, lié à un contrat et à un véhicule.
• Chaque sinistre donne lieu à un suivi de traitement (état : en cours, traité, refusé) et une évaluation du montant pris en charge.

--------------------------------------------------
QUESTION 1.a :
Identifiez les différentes entités avec leurs propriétés respectives.`,
        explanation: `ENTITÉS ET LEURS PROPRIÉTÉS RESPECTIVES :

1. CLIENT (id_client, nom, prenom, email, telephone)
2. VEHICULE (id_vehicule, immatriculation, marque, modele)
3. CONTRAT (id_contrat, date_debut, date_fin, type_contrat)
4. GARANTIE (id_garantie, libelle, description)
5. SINISTRE (id_sinistre, date_sinistre, etat, montant_prise_en_charge)`,
        hint: "Les 5 entités sont CLIENT, VEHICULE, CONTRAT, GARANTIE, SINISTRE."
      },
      {
        id: "2025-info-ex4-q1b",
        title: "Exercice 4 : Assurance Auto (Question 1.b : Modèle MCD)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 4 : Gestion d'une assurance automobile (3 pts)

ÉNONCÉ :
Une compagnie d'assurance souhaite gérer les contrats d'assurance automobile de ses clients :
• Un client peut souscrire plusieurs contrats auto ; un contrat est associé à un seul véhicule.
• Un véhicule n'appartient qu'à un seul client à un moment donné.
• Chaque contrat couvre une période donnée (date de début, date de fin).
• La compagnie propose plusieurs types de garanties (vol, incendie, etc.). Un contrat peut inclure plusieurs garanties.
• En cas d'incident, le client déclare un sinistre, lié à un contrat et à un véhicule.
• Chaque sinistre donne lieu à un suivi de traitement (état : en cours, traité, refusé) et une évaluation du montant pris en charge.

--------------------------------------------------
QUESTION 1.b :
Proposer le modèle entité-association (MCD) avec les associations et les cardinalités.`,
        explanation: `ASSOCIATIONS ET CARDINALITÉS DU MCD :

• CLIENT --(1,N)-- [Souscrire] --(1,1)-- CONTRAT
• VEHICULE --(1,1)-- [Associer] --(1,1)-- CONTRAT
• CONTRAT --(1,N)-- [Couvrir] --(1,N)-- GARANTIE
• CONTRAT --(1,N)-- [Déclarer] --(1,1)-- SINISTRE`,
        hint: "Définissez les associations : Souscrire, Associer, Couvrir, Déclarer."
      },
      {
        id: "2025-info-ex4-q2",
        title: "Exercice 4 : Assurance Auto (Question 2 : Modèle MLD)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 4 : Gestion d'une assurance automobile (3 pts)

ÉNONCÉ :
Une compagnie d'assurance souhaite gérer les contrats d'assurance automobile de ses clients :
• Un client peut souscrire plusieurs contrats auto ; un contrat est associé à un seul véhicule.
• Un véhicule n'appartient qu'à un seul client à un moment donné.
• Chaque contrat couvre une période donnée (date de début, date de fin).
• La compagnie propose plusieurs types de garanties (vol, incendie, etc.). Un contrat peut inclure plusieurs garanties.
• En cas d'incident, le client déclare un sinistre, lié à un contrat et à un véhicule.
• Chaque sinistre donne lieu à un suivi de traitement (état : en cours, traité, refusé) et une évaluation du montant pris en charge.

--------------------------------------------------
QUESTION 2 :
Déduire le modèle relationnel associé (MLD).`,
        explanation: `MODÈLE RELATIONNEL (MLD) :

• CLIENT (id_client [PK], nom, prenom, email)
• VEHICULE (id_vehicule [PK], immatriculation, marque, id_client [FK])
• CONTRAT (id_contrat [PK], date_debut, date_fin, id_vehicule [FK])
• GARANTIE (id_garantie [PK], libelle)
• CONTRAT_GARANTIE (id_contrat [PK, FK], id_garantie [PK, FK])
• SINISTRE (id_sinistre [PK], date_sinistre, etat, montant, id_contrat [FK])`,
        hint: "CONTRAT_GARANTIE est la table d'association N-N."
      },
      {
        id: "2025-info-ex4-q3",
        title: "Exercice 4 : Assurance Auto (Question 3 : Scripts SQL DDL)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 4 : Gestion d'une assurance automobile (3 pts)

ÉNONCÉ :
Une compagnie d'assurance souhaite gérer les contrats d'assurance automobile de ses clients :
• Entités : CLIENT, VEHICULE, CONTRAT, GARANTIE, SINISTRE.

--------------------------------------------------
QUESTION 3 :
Donner les scripts SQL permettant de créer les tables issues du modèle relationnel en utilisant les contraintes nommées (CONSTRAINT pk_..., CONSTRAINT fk_..., CONSTRAINT chk_...).`,
        explanation: `SCRIPTS SQL DDL AVEC CONTRAINTES NOMMÉES :

CREATE TABLE CLIENT (
    id_client INT AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    CONSTRAINT pk_client PRIMARY KEY (id_client)
);

CREATE TABLE VEHICULE (
    id_vehicule INT AUTO_INCREMENT,
    immatriculation VARCHAR(20) NOT NULL,
    id_client INT NOT NULL,
    CONSTRAINT pk_vehicule PRIMARY KEY (id_vehicule),
    CONSTRAINT uq_immat UNIQUE (immatriculation),
    CONSTRAINT fk_vehicule_client FOREIGN KEY (id_client) REFERENCES CLIENT(id_client)
);

CREATE TABLE CONTRAT (
    id_contrat INT AUTO_INCREMENT,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    id_vehicule INT NOT NULL,
    CONSTRAINT pk_contrat PRIMARY KEY (id_contrat),
    CONSTRAINT chk_dates CHECK (date_fin >= date_debut),
    CONSTRAINT fk_contrat_vehicule FOREIGN KEY (id_vehicule) REFERENCES VEHICULE(id_vehicule)
);

CREATE TABLE SINISTRE (
    id_sinistre INT AUTO_INCREMENT,
    date_sinistre DATE NOT NULL,
    etat VARCHAR(20) NOT NULL,
    montant DECIMAL(10,2) DEFAULT 0,
    id_contrat INT NOT NULL,
    CONSTRAINT pk_sinistre PRIMARY KEY (id_sinistre),
    CONSTRAINT chk_etat CHECK (etat IN ('en cours', 'traité', 'refusé')),
    CONSTRAINT fk_sinistre_contrat FOREIGN KEY (id_contrat) REFERENCES CONTRAT(id_contrat)
);`,
        hint: "Utilisez la syntaxe CONSTRAINT nom_contrainte PRIMARY KEY / FOREIGN KEY / CHECK."
      },

      // EXERCICE 5 : PHP - PDO & SÉCURITÉ (ÉNONCÉ DU SUJET ET QUESTION PAR ÉCRAN)
      {
        id: "2025-info-ex5-q1",
        title: "Exercice 5 : PHP - PDO & Sécurité (Question 1/2 : Connexion & Requête Préparée)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 5 : PHP - PDO & Sécurité (3 pts)

ÉNONCÉ :
Dans le cadre du développement de la plateforme ESATIC-Services, vous devez sécuriser l'accès aux données des utilisateurs enregistrés dans une base de données MySQL ('esatic').

--------------------------------------------------
QUESTION 1 :
a) Établissez une connexion PDO sécurisée à la base de données avec gestion d'erreurs d'exception (Try/Catch).
b) Implémentez une requête préparée sécurisée contre les injections SQL pour vérifier les identifiants de l'utilisateur.`,
        explanation: `try {
    $pdo = new PDO('mysql:host=localhost;dbname=esatic', 'user', 'pass', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    $stmt = $pdo->prepare("SELECT * FROM Utilisateur WHERE login = :login");
    $stmt->execute([':login' => $login]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($password, $user['password_hash'])) {
        echo "Connexion réussie !";
    }
} catch (PDOException $e) {
    die("Erreur DB : " . $e->getMessage());
}`,
        hint: "PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION et $pdo->prepare()."
      },
      {
        id: "2025-info-ex5-q2",
        title: "Exercice 5 : PHP - PDO & Sécurité (Question 2 : Stockage Mots de passe)",
        type: "mcq",
        difficulty: "Facile",
        prompt: `Exercice 5 : PHP - PDO & Sécurité (3 pts)

ÉNONCÉ :
Sécurité des comptes utilisateurs ESATIC-Services.

--------------------------------------------------
QUESTION 2 :
Quelle méthode doit être utilisée pour stocker les mots de passe de manière sécurisée en base de données ?`,
        options: [
          { id: "a", text: "a) md5($password)", isCorrect: false },
          { id: "b", text: "b) password_hash($password, PASSWORD_BCRYPT)", isCorrect: true },
          { id: "c", text: "c) sha1($password . $salt)", isCorrect: false },
          { id: "d", text: "d) crypt($password)", isCorrect: false }
        ],
        explanation: "b) password_hash($password, PASSWORD_BCRYPT) est le standard recommandé en PHP.",
        hint: "Utilisez password_hash()."
      },

      // EXERCICE 6 : POO JAVA & COLLECTIONS (ÉNONCÉ DU SUJET ET QUESTION PAR ÉCRAN)
      {
        id: "2025-info-ex6-q1",
        title: "Exercice 6 : POO Java & Collections (Question 1/3 : Choix de Collection)",
        type: "mcq",
        difficulty: "Facile",
        prompt: `Exercice 6 : Modélisation UML & Collections Java (4 pts)

ÉNONCÉ :
On modélise une gestion de bibliothèque d'ouvrage à l'ESATIC.
public class Livre {
    private String isbn; // Format unique ex: "123-4567890123"
}

--------------------------------------------------
QUESTION 1 :
Quelle collection Java de la Java Collections Framework (JCF) utiliser pour stocker des objets Livre sans doublons d'ISBN ?`,
        options: [
          { id: "a", text: "a. ArrayList", isCorrect: false },
          { id: "b", text: "b. HashSet", isCorrect: true },
          { id: "c", text: "c. HashMap", isCorrect: false },
          { id: "d", text: "d. LinkedList", isCorrect: false }
        ],
        explanation: "b. HashSet est la collection de type Set qui interdit les doublons.",
        hint: "HashSet est la collection idéale sans doublons."
      },
      {
        id: "2025-info-ex6-q2",
        title: "Exercice 6 : POO Java & Collections (Question 2/3 : Méthode d'Ajout)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 6 : Modélisation UML & Collections Java (4 pts)

ÉNONCÉ :
Classe Livre (isbn: String). On souhaite garantir l'unicité lors de l'ajout d'un livre dans la bibliothèque.

--------------------------------------------------
QUESTION 2 :
Implémentez la vérification d'unicité d'ISBN dans la méthode Java :

public boolean ajouterLivre(Livre livre) {
    // À compléter (utilisez une collection appropriée)
}`,
        explanation: `private Set<String> isbns = new HashSet<>();

public boolean ajouterLivre(Livre livre) {
    if (livre == null || livre.getIsbn() == null) {
        return false;
    }
    return isbns.add(livre.getIsbn());
}`,
        hint: "HashSet.add() renvoie false si l'élément existe déjà."
      },
      {
        id: "2025-info-ex6-q3",
        title: "Exercice 6 : POO Java & Collections (Question 3/3 : Legacy Vector)",
        type: "code_written",
        difficulty: "Facile",
        prompt: `Exercice 6 : Modélisation UML & Collections Java (4 pts)

ÉNONCÉ :
Collections Java modernes vs Legacy.

--------------------------------------------------
QUESTION 3 :
Pourquoi ne doit-on pas utiliser java.util.Vector dans une application Java moderne ?`,
        explanation: `java.util.Vector est une classe legacy synchronisée systématiquement sur chaque méthode, entraînant une perte de performance importante en mono-thread par rapport à ArrayList.`,
        hint: "Vector est synchronisé par défaut sur chaque méthode."
      }
    ]
  },

  // ==========================================
  // MATHÉMATIQUES SESSION 2025
  // ==========================================
  {
    id: "session-2025-maths",
    track: "all",
    category: "Sujets Officiels 2025",
    professor: "ESATIC - Session 2025",
    title: "Épreuve Mathématiques (Session 2025)",
    icon: "Calculator",
    color: "from-blue-600 via-indigo-600 to-purple-600",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    description: "Sujet officiel mot à mot (Durée: 2h00). Ce sujet comporte 05 exercices en 02 pages. Aucun document n'est autorisé.",
    questions: [
      // ==========================================
      // EXERCICE 1 : MATRICE & JORDAN (4 Questions)
      // ==========================================
      {
        id: "2025-math-ex1-q1",
        title: "EXERCICE 1 : Matrice & Jordan (Question 1/4 : Polynôme Caractéristique)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 1 : Matrice & Jordan (5 points)

CONTEXTE & ÉNONCÉ :
Soit A la matrice de M4(R) suivante :
[-2  -1   1   2]
[ 1  -4   1   2]
[ 0   0  -5   4]
[ 0   0  -1  -1]

--------------------------------------------------
QUESTION 1 :
Déterminer le polynôme caractéristique P_A(X) de la matrice A.`,
        explanation: `La matrice A est triangulaire supérieure par blocs.
P_A(X) = det(X I_2 - A_11) * det(X I_2 - A_22)

• det(X I_2 - A_11) = (X+2)(X+4) + 1 = X^2 + 6X + 9 = (X+3)^2
• det(X I_2 - A_22) = (X+5)(X+1) + 4 = X^2 + 6X + 9 = (X+3)^2

Ainsi, P_A(X) = (X + 3)^4.`,
        hint: "Le polynôme caractéristique est donné par : P_A(X) = det(A - X · I_n). Pour une matrice triangulaire par blocs : P_A(X) = det(A_11 - X · I_2) · det(A_22 - X · I_2)."
      },
      {
        id: "2025-math-ex1-q2",
        title: "EXERCICE 1 : Matrice & Jordan (Question 2/4 : Valeurs Propres)",
        type: "short_answer",
        difficulty: "Facile",
        prompt: `EXERCICE 1 : Matrice & Jordan (5 points)

CONTEXTE & ÉNONCÉ :
Soit A la matrice de M4(R) suivante :
[-2  -1   1   2]
[ 1  -4   1   2]
[ 0   0  -5   4]
[ 0   0  -1  -1]

(Rappel Q1 : P_A(X) = (X + 3)^4)

--------------------------------------------------
QUESTION 2 :
Déterminer les valeurs propres de la matrice A et leur multiplicité algébrique.`,
        correctAnswerKey: "λ = -3 (multiplicité 4)",
        explanation: `P_A(X) = (X + 3)^4. La seule racine est λ = -3.
La matrice A admet donc une unique valeur propre λ = -3 de multiplicité algébrique 4.`,
        hint: "Recherchez les racines de P_A(X) = (X + 3)^4."
      },
      {
        id: "2025-math-ex1-q3",
        title: "EXERCICE 1 : Matrice & Jordan (Question 3/4 : Diagonalisabilité)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 1 : Matrice & Jordan (5 points)

CONTEXTE & ÉNONCÉ :
Soit A la matrice de M4(R) suivante :
[-2  -1   1   2]
[ 1  -4   1   2]
[ 0   0  -5   4]
[ 0   0  -1  -1]

(Rappel : Valeur propre unique λ = -3 de multiplicité 4)

--------------------------------------------------
QUESTION 3 :
La matrice A est-elle diagonalisable ? Justifier votre réponse.`,
        explanation: `Calculons la dimension du sous-espace propre E_-3(A) = Ker(A + 3 I_4) :
A + 3 I_4 a pour rang 2 (rg = 2).
Par le théorème du rang : dim(E_-3(A)) = 4 - 2 = 2.

Comme dim(E_-3(A)) = 2 < 4 (multiplicité algébrique), la matrice A N'EST PAS diagonalisable.`,
        hint: "Calculez dim(Ker(A + 3I)). Est-elle égale à 4 ?"
      },
      {
        id: "2025-math-ex1-q4",
        title: "EXERCICE 1 : Matrice & Jordan (Question 4/4 : Réduite de Jordan)",
        type: "code_written",
        difficulty: "Difficile",
        prompt: `EXERCICE 1 : Matrice & Jordan (5 points)

CONTEXTE & ÉNONCÉ :
Soit A la matrice de M4(R) suivante :
[-2  -1   1   2]
[ 1  -4   1   2]
[ 0   0  -5   4]
[ 0   0  -1  -1]

(Rappel : λ = -3, dim(E_-3) = 2, (A + 3I)^2 = 0)

--------------------------------------------------
QUESTION 4 :
Déterminer une réduite de Jordan J de la matrice A.`,
        explanation: `1. Nombre de blocs de Jordan = dim(E_-3(A)) = 2.
2. Indice de nilpotence = 2 car (A + 3I_4)^2 = 0_4.
3. La seule partition de 4 en 2 blocs de taille max 2 est (2, 2).

Réduite de Jordan J :
J = [ -3  1  0  0 ]
    [  0 -3  0  0 ]
    [  0  0 -3  1 ]
    [  0  0  0 -3 ]`,
        hint: "2 blocs de Jordan J_2(-3) de taille 2."
      },

      // ==========================================
      // EXERCICE 2 : SUITES & TÉLESCOPAGE (5 Questions)
      // ==========================================
      {
        id: "2025-math-ex2-q1",
        title: "EXERCICE 2 : Suites & Télescopage (Question 1/5)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 2 : Suites & Télescopage (5 points)

CONTEXTE & ÉNONCÉ :
Soit n dans N*. On définit trois suites u_n, v_n et S_n par :
u_n = sum_{k=1}^n 1/k ; v_n = sum_{k=1}^n k^2 et S_n = sum_{k=1}^n 1/v_k

--------------------------------------------------
QUESTION 1 :
Calculer de deux façons différentes sum_{k=1}^n ((k+1)^3 - k^3).`,
        explanation: `1ère façon (Télescopage) : sum_{k=1}^n ((k+1)^3 - k^3) = (n+1)^3 - 1^3 = (n+1)^3 - 1.
2ème façon (Développement) : (k+1)^3 - k^3 = 3k^2 + 3k + 1.
D'où sum = 3 sum(k^2) + 3 sum(k) + sum(1) = 3 v_n + 3 (n(n+1)/2) + n.`,
        hint: "Identifiez le télescopage d'un côté et développez (k+1)^3 de l'autre."
      },
      {
        id: "2025-math-ex2-q2",
        title: "EXERCICE 2 : Suites & Télescopage (Question 2/5)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 2 : Suites & Télescopage (5 points)

CONTEXTE :
u_n = sum 1/k, v_n = sum k^2, S_n = sum 1/v_k.
sum_{k=1}^n ((k+1)^3 - k^3) = (n+1)^3 - 1 = 3 v_n + 3 n(n+1)/2 + n.

--------------------------------------------------
QUESTION 2 :
Montrer que pour tout n dans N*, v_n = n(n+1)(2n+1)/6.`,
        explanation: `En égalant les deux expressions de Q1 :
3 v_n = (n+1)^3 - 1 - 3n(n+1)/2 - n
      = n^3 + 3n^2 + 3n - 3n(n+1)/2 - n
      = n(2n^2 + 6n + 4 - 3n - 3)/2
      = n(2n^2 + 3n + 1)/2
      = n(n+1)(2n+1)/2
D'où v_n = n(n+1)(2n+1)/6.`,
        hint: "Isolez v_n dans 3 v_n = (n+1)^3 - 1 - 3n(n+1)/2 - n."
      },
      {
        id: "2025-math-ex2-q3",
        title: "EXERCICE 2 : Suites & Télescopage (Question 3/5)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 2 : Suites & Télescopage (5 points)

--------------------------------------------------
QUESTION 3 :
Déterminer les réels a, b et c tels que :
forall n dans N*, 1 / (n(n+1)(2n+1)) = a/n + b/(n+1) + c/(2n+1).`,
        explanation: `Par réduction au même dénominateur ou identification aux pôles :
• Pour n=0 : a = 1
• Pour n=-1 : b = 1
• Pour n=-1/2 : c = -4
Vérification : 1/n + 1/(n+1) - 4/(2n+1) = (2n+1 + n)/(n(n+1)(2n+1)) - 4n(n+1) ... = 1/(n(n+1)(2n+1)).`,
        hint: "Multipliez par n et posez n=0 pour trouver a, etc."
      },
      {
        id: "2025-math-ex2-q4",
        title: "EXERCICE 2 : Suites & Télescopage (Question 4/5)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 2 : Suites & Télescopage (5 points)

CONTEXTE :
u_n = sum_{k=1}^n 1/k.

--------------------------------------------------
QUESTION 4 :
Montrer que pour tout n dans N*, sum_{k=1}^n 1/(2k+1) = u_{2n+1} - 1/2 u_n - 1.`,
        explanation: `sum_{k=1}^n 1/(2k+1) est la somme des termes impairs de 3 à 2n+1.
Somme totale u_{2n+1} = 1 + sum_{impairs} 1/(2k+1) + sum_{pairs} 1/(2k).
Or sum_{pairs} 1/(2k) = (1/2) sum_{k=1}^n 1/k = (1/2) u_n.
D'où u_{2n+1} = 1 + sum_{k=1}^n 1/(2k+1) + (1/2) u_n
=> sum_{k=1}^n 1/(2k+1) = u_{2n+1} - 1/2 u_n - 1.`,
        hint: "Séparez la somme des nombres pairs et des nombres impairs."
      },
      {
        id: "2025-math-ex2-q5",
        title: "EXERCICE 2 : Suites & Télescopage (Question 5/5)",
        type: "code_written",
        difficulty: "Difficile",
        prompt: `EXERCICE 2 : Suites & Télescopage (5 points)

CONTEXTE :
v_k = k(k+1)(2k+1)/6, donc 1/v_k = 6 / (k(k+1)(2k+1)).
1/(k(k+1)(2k+1)) = 1/k + 1/(k+1) - 4/(2k+1).

--------------------------------------------------
QUESTION 5 :
Exprimer pour n dans N*, S_n = sum_{k=1}^n 1/v_k à l'aide de la suite u_n.`,
        explanation: `S_n = 6 sum_{k=1}^n (1/k + 1/(k+1) - 4/(2k+1))
    = 6 [ u_n + (u_{n+1} - 1) - 4 (u_{2n+1} - 1/2 u_n - 1) ]
    = 6 [ 3 u_n + u_{n+1} - 4 u_{2n+1} + 3 ].`,
        hint: "Injectez la décomposition de la Q3 et le résultat de la Q4."
      },

      // ==========================================
      // EXERCICE 3 : NORMES C1 (4 Questions)
      // ==========================================
      {
        id: "2025-math-ex3-q1",
        title: "EXERCICE 3 : Normes C1 (Question 1/4 : Définition)",
        type: "code_written",
        difficulty: "Facile",
        prompt: `EXERCICE 3 : Normes C1 (4 points)

CONTEXTE :
Soit E le R-espace vectoriel des applications f : [0; 1] -> R de classe C1 telles que f(0) = 0.

--------------------------------------------------
QUESTION 1 :
Donner la définition d'une norme sur l'espace vectoriel E.`,
        explanation: `Une norme sur E est une application N : E -> R+ vérifiant pour tout f, g dans E et tout λ dans R :
1) Séparation : N(f) = 0 <=> f = 0.
2) Homogénéité : N(λ f) = |λ| N(f).
3) Inégalité triangulaire : N(f + g) <= N(f) + N(g).`,
        hint: "Énoncez les 3 axiomes : Séparation, Homogénéité, Inégalité triangulaire."
      },
      {
        id: "2025-math-ex3-q2",
        title: "EXERCICE 3 : Normes C1 (Question 2/4 : Équation Différentielle)",
        type: "code_written",
        difficulty: "Facile",
        prompt: `EXERCICE 3 : Normes C1 (4 points)

CONTEXTE :
E = { f dans C1([0, 1], R) | f(0) = 0 }.

--------------------------------------------------
QUESTION 2 :
Résoudre dans E l'équation différentielle f' + f = 0.`,
        explanation: `Les solutions de f' + f = 0 sont les fonctions f(x) = C e^-x avec C dans R.
Comme f appartient à E, on a f(0) = 0, d'où C e^0 = 0 => C = 0.
La seule solution dans E est la fonction nulle f = 0.`,
        hint: "Solutions générales C*e^(-x), puis utilisez la condition f(0) = 0."
      },
      {
        id: "2025-math-ex3-q3",
        title: "EXERCICE 3 : Normes C1 (Question 3/4 : Démonstration Normes)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 3 : Normes C1 (4 points)

CONTEXTE :
Pour tout f dans E (avec f(0) = 0) :
N(f) = integral_0^1 |f'|  et  V(f) = integral_0^1 |f' + f|

--------------------------------------------------
QUESTION 3 :
Montrer que N et V sont des normes sur E.`,
        explanation: `Pour N(f) :
• Homogénéité et Inégalité triangulaire découlent de la linéarité et de la valeur absolue sur l'intégrale.
• Séparation : N(f) = 0 => integral |f'| = 0 => f' = 0 (car f' est continue) => f est constante. Comme f(0) = 0, f = 0.

Pour V(f) :
• Idem. Séparation : V(f) = 0 => integral |f' + f| = 0 => f' + f = 0 => f = 0 (d'après Q2).
Ainsi N et V sont des normes sur E.`,
        hint: "Pour la séparation de V, réutilisez le résultat de la Q2."
      },
      {
        id: "2025-math-ex3-q4",
        title: "EXERCICE 3 : Normes C1 (Question 4/4 : Majoration)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 3 : Normes C1 (4 points)

--------------------------------------------------
QUESTION 4 :
Montrer que pour toute f dans E, V(f) <= 2 N(f).`,
        explanation: `Pour x dans [0, 1], f(x) = f(0) + integral_0^x f'(t) dt = integral_0^x f'(t) dt.
Donc |f(x)| <= integral_0^x |f'(t)| dt <= integral_0^1 |f'(t)| dt = N(f).
Alors V(f) = integral_0^1 |f' + f| <= integral_0^1 |f'| + integral_0^1 |f| <= N(f) + N(f) = 2 N(f).`,
        hint: "Majorez |f(x)| par N(f) en intégrant f'."
      },

      // ==========================================
      // EXERCICE 4 : HARMONIQUES DU SIGNAL (3 Questions)
      // ==========================================
      {
        id: "2025-math-ex4-q1",
        title: "EXERCICE 4 : Harmoniques du Signal (Question 1/3 : Fondamental)",
        type: "short_answer",
        difficulty: "Facile",
        prompt: `EXERCICE 4 : Harmoniques du Signal (4 points)

CONTEXTE :
e(t) = (4/π) A sum_{n=0}^{+infty} (1/(2n+1)) sin((2n+1) ω t)
Signal rectangulaire de fréquence f = 4 kHz et d'amplitude A = 3 Volt.

--------------------------------------------------
QUESTION 1 :
Donner l'amplitude et la fréquence du FONDAMENTAL (rang n=0).`,
        correctAnswerKey: "Fréquence: 4 kHz, Amplitude: 12/π Volt (~3.82 V)",
        explanation: "Pour n=0 (Fondamental) : f0 = f = 4 kHz. Amplitude A0 = (4/π) * 3 = 12/π Volt ≈ 3.82 V.",
        hint: "Prenez n=0 dans la formule d'onde."
      },
      {
        id: "2025-math-ex4-q2",
        title: "EXERCICE 4 : Harmoniques du Signal (Question 2/3 : 1er Harmonique)",
        type: "short_answer",
        difficulty: "Facile",
        prompt: `EXERCICE 4 : Harmoniques du Signal (4 points)

CONTEXTE :
Signal rectangulaire f = 4 kHz, A = 3 V.

--------------------------------------------------
QUESTION 2 :
Donner l'amplitude et la fréquence du 1er harmonique non nul (n=1).`,
        correctAnswerKey: "Fréquence: 12 kHz, Amplitude: 4/π Volt (~1.27 V)",
        explanation: "Pour n=1 : f1 = 3 * f = 12 kHz. Amplitude A1 = (4/π * 3) / 3 = 4/π Volt ≈ 1.27 V.",
        hint: "Prenez n=1 dans la somme (fréquence 3f)."
      },
      {
        id: "2025-math-ex4-q3",
        title: "EXERCICE 4 : Harmoniques du Signal (Question 3/3 : 2ème Harmonique)",
        type: "short_answer",
        difficulty: "Facile",
        prompt: `EXERCICE 4 : Harmoniques du Signal (4 points)

--------------------------------------------------
QUESTION 3 :
Donner l'amplitude et la fréquence du 2ème harmonique non nul (n=2).`,
        correctAnswerKey: "Fréquence: 20 kHz, Amplitude: 12/(5π) Volt (~0.76 V)",
        explanation: "Pour n=2 : f2 = 5 * f = 20 kHz. Amplitude A2 = (4/π * 3) / 5 = 12/(5π) Volt ≈ 0.76 V.",
        hint: "Prenez n=2 dans la somme (fréquence 5f)."
      },

      // ==========================================
      // EXERCICE 5 : BERNOULLI EMV (1 Question)
      // ==========================================
      {
        id: "2025-math-ex5",
        title: "EXERCICE 5 : Bernoulli EMV (2 pts)",
        type: "short_answer",
        difficulty: "Facile",
        prompt: `EXERCICE 5 : Estimateur du Maximum de Vraisemblance (2 points)

On considère un échantillon (X1, X2, ..., Xn) issu d'une loi de Bernoulli de paramètre θ, avec θ dans ]0, 1[.

--------------------------------------------------
QUESTION :
Déterminer l'estimateur du maximum de vraisemblance θ_EMV de θ.`,
        correctAnswerKey: "θ_EMV = (1/n) * sum Xi = X_barre",
        explanation: "L(θ) = θ^(sum Xi) * (1-θ)^(n - sum Xi). La dérivée du log rend θ = (1/n) sum Xi = X_barre.",
        hint: "La réponse est la moyenne empirique X_barre."
      }
    ]
  },

  // ==========================================
  // MATIÈRES INDIVIDUELLES (NIVEAU PREPA MASTER ESATIC)
  // ==========================================
  {
    id: "master-algo-sd",
    track: "info",
    category: "Matières Individuelles Master",
    professor: "ESATIC Master - Algorithmique",
    title: "Algorithmique Avancée & Graphes (Master)",
    icon: "Code2",
    color: "from-emerald-600 via-teal-600 to-cyan-600",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    description: "Exercices type Master ESATIC : Programmation Dynamique, Algorithme de Dijkstra, Arbres B-Tree, et complexités temporelles.",
    questions: [
      {
        id: "master-algo-ex1",
        title: "Exercice 1 : Programmation Dynamique - Sac à Dos (0/1 Knapsack)",
        type: "code_written",
        difficulty: "Difficile",
        prompt: `Niveau Master Info : Programmation Dynamique (Knapsack)

On dispose de N objets. Chaque objet i possède un poids w[i] et une valeur v[i]. On dispose d'un sac de capacité maximale W.
Écrire une fonction Python knapsack(weights: list, values: list, W: int) -> int qui renvoie la valeur maximale qu'on peut obtenir sans dépasser la capacité W.

• Exemple :
  weights = [2, 3, 4, 5]
  values  = [3, 4, 5, 6]
  W = 5
  Output -> 7 (Objets de poids 2 et 3)`,
        explanation: `def knapsack(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        w, v = weights[i - 1], values[i - 1]
        for j in range(W + 1):
            if w <= j:
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - w] + v)
            else:
                dp[i][j] = dp[i - 1][j]

    return dp[n][W]`,
        hint: "Matrice DP[N+1][W+1]. dp[i][j] = max(sans l'objet, avec l'objet)."
      },
      {
        id: "master-algo-ex2",
        title: "Exercice 2 : Graphes & Algorithmes de Plus Court Chemin",
        type: "mcq",
        difficulty: "Moyen",
        prompt: `Niveau Master Info : Théorie des Graphes

Soit un graphe orienté comportant V sommets et E arêtes, où certaines arêtes possèdent un poids NÉGATIF mais sans circuit de poids négatif.

Quel algorithme devez-vous impérativement utiliser pour trouver les plus courts chemins depuis une source unique ?`,
        options: [
          { id: "a", text: "A) Algorithme de Dijkstra avec Tas Binaire", isCorrect: false },
          { id: "b", text: "B) Algorithme de Bellman-Ford en O(V * E)", isCorrect: true },
          { id: "c", text: "C) Parcours en Largeur BFS", isCorrect: false },
          { id: "d", text: "D) Algorithme A* avec heuristique de Manhattan", isCorrect: false }
        ],
        explanation: "B) Dijkstra ne fonctionne PAS sur des poids négatifs. Seul Bellman-Ford (ou Floyd-Warshall pour tous les couples) gère correctement les poids négatifs.",
        hint: "Dijkstra échoue avec des arêtes de poids négatif."
      },
      {
        id: "master-algo-ex3-q1",
        title: "Exercice 3 : Arbres & Index B-Tree (Question 1/2 : B-Tree vs AVL)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Niveau Master Info : Structures de Données Avancées

CONTEXTE & ÉNONCÉ :
On s'intéresse aux structures d'index dans les moteurs de bases de données relationnelles (PostgreSQL, MySQL).

--------------------------------------------------
QUESTION 1 :
Pourquoi les moteurs de bases de données utilisent-ils des B-Trees (ou B+Trees) plutôt que des arbres équilibrés binaires (AVL) pour leurs index ?`,
        explanation: `Les B-Trees ont un facteur de branchement très élevé (m grand), ce qui réduit la hauteur de l'arbre et minimise drastiquement le nombre d'accès disque (I/O). Les arbres AVL, étant binaires, nécessiteraient beaucoup plus d'accès disque.`,
        hint: "Pensez aux accès disque (I/O) et au facteur de branchement m."
      },
      {
        id: "master-algo-ex3-q2",
        title: "Exercice 3 : Arbres & Index B-Tree (Question 2/2 : Hauteur max B-Tree)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Niveau Master Info : Structures de Données Avancées

CONTEXTE & ÉNONCÉ :
Soit un arbre B-Tree d'ordre m contenant N clés enregistrées.

--------------------------------------------------
QUESTION 2 :
Donner la formule de la hauteur maximale H d'un arbre B-Tree d'ordre m contenant N clés.`,
        explanation: `Hauteur max H <= log_ceil(m/2) ((N + 1) / 2). La recherche reste en O(log N).`,
        hint: "Formule en log base ceil(m/2)."
      }
    ]
  },

  {
    id: "master-bdd-sql",
    track: "info",
    category: "Matières Individuelles Master",
    professor: "ESATIC Master - Génie Logiciel & BDD",
    title: "Bases de Données Avancées & SQL (Master)",
    icon: "Database",
    color: "from-amber-600 via-orange-600 to-red-600",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    description: "Exercices type Master ESATIC : Normalisation (3NF, BCNF), Window Functions SQL (RANK, PARTITION BY), et Transactions ACID.",
    questions: [
      {
        id: "master-bdd-ex1-q1",
        title: "Exercice 1 : Normalisation Relational Schema (Question 1/2 : Clés Candidates)",
        type: "code_written",
        difficulty: "Difficile",
        prompt: `Niveau Master Info : Théorie des Bases de Données

CONTEXTE & ÉNONCÉ :
Soit la relation R(A, B, C, D) et l'ensemble de dépendances fonctionnelles DF = { A -> B, BC -> D, D -> A }.

--------------------------------------------------
QUESTION 1 :
Déterminer toutes les clés candidates de la relation R.`,
        explanation: `Clés candidates : (A, C), (D, C), et (B, C) car (BC)+ = BCAD = R.`,
        hint: "Calculez la fermeture des attributs (A,C)+, (B,C)+, (D,C)+."
      },
      {
        id: "master-bdd-ex1-q2",
        title: "Exercice 1 : Normalisation Relational Schema (Question 2/2 : 3NF & BCNF)",
        type: "code_written",
        difficulty: "Difficile",
        prompt: `Niveau Master Info : Théorie des Bases de Données

CONTEXTE & ÉNONCÉ :
Relation R(A, B, C, D) avec DF = { A -> B, BC -> D, D -> A }.
(Rappel Q1 : Clés candidates (A,C), (D,C), (B,C))

--------------------------------------------------
QUESTION 2 :
La relation R est-elle en 3NF ? En BCNF ? Justifier précisément.`,
        explanation: `• 3NF : Oui, car pour chaque X -> Y, soit X est une sur-clé, soit Y est un attribut prime (A, B, C, D sont tous primes).
• BCNF : Non ! Car D -> A est une DF valide mais D n'est pas une sur-clé (D+ = DA != R).`,
        hint: "Vérifiez si le membre gauche de chaque DF est une sur-clé."
      },
      {
        id: "master-bdd-ex2",
        title: "Exercice 2 : Requêtes SQL Avancées (Window Functions)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Niveau Master Info : SQL Avancé

Soit la table Etudiant(id_etudiant, departement, moyenne).
Écrire une requête SQL qui affiche pour chaque étudiant son ID, son département, sa moyenne, ainsi que son RANG (classement) au sein de son propre département (du meilleur au plus faible).`,
        explanation: `SELECT 
    id_etudiant,
    departement,
    moyenne,
    DENSE_RANK() OVER (
        PARTITION BY departement 
        ORDER BY moyenne DESC
    ) AS rang_dept
FROM Etudiant;`,
        hint: "Utilisez DENSE_RANK() OVER (PARTITION BY departement ORDER BY moyenne DESC)."
      },
      {
        id: "master-bdd-ex3",
        title: "Exercice 3 : Propriétés ACID & Niveaux d'Isolement",
        type: "mcq",
        difficulty: "Moyen",
        prompt: `Niveau Master Info : Transactions & Concurrence

Quel niveau d'isolement SQL empêche à la fois les 'Lectures Impropres' (Dirty Reads) et les 'Lectures Non Répétables' (Non-repeatable Reads), mais peut autoriser les 'Lectures Fantômes' (Phantom Reads) ?`,
        options: [
          { id: "a", text: "A) Read Uncommitted", isCorrect: false },
          { id: "b", text: "B) Read Committed", isCorrect: false },
          { id: "c", text: "C) Repeatable Read", isCorrect: true },
          { id: "d", text: "D) Serializable", isCorrect: false }
        ],
        explanation: "C) Repeatable Read garantit que deux lectures dans la même transaction liront la même valeur pour des lignes existantes, mais de nouvelles lignes insérées par une autre transaction peuvent apparaître (Phantom Reads).",
        hint: "Repeatable Read protège contre la modification des lignes existantes."
      }
    ]
  },

  {
    id: "master-reseaux-telecom",
    track: "telecom",
    category: "Matières Individuelles Master",
    professor: "ESATIC Master - Télécoms & Réseaux",
    title: "Réseaux Avancés & Télécoms Numériques (Master)",
    icon: "Network",
    color: "from-cyan-600 via-blue-600 to-indigo-600",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    description: "Exercices type Master ESATIC : Découpage VLSM, Théorème de Shannon, Modulations numériques QPSK/QAM et BGP/OSPF.",
    questions: [
      {
        id: "master-telecom-ex1",
        title: "Exercice 1 : Théorème de Nyquist-Shannon & Capacité de Canal",
        type: "short_answer",
        difficulty: "Difficile",
        prompt: `Niveau Master Télécoms : Transmission de Données

Un canal de transmission possède une bande passante B = 1 MHz (10^6 Hz) et un rapport signal sur bruit SNR_dB = 30 dB.

1) Calculer la capacité maximale théorique de Shannon de ce canal en Mbit/s.
(Rappel: SNR_dB = 10 log10(SNR_linéaire), C = B * log2(1 + SNR_linéaire)).
Donnée : 10^3 = 1000 ≈ 2^10.`,
        correctAnswerKey: "C ≈ 9.97 Mbit/s (ou ~10 Mbit/s)",
        explanation: `1. SNR_dB = 30 dB => 10 log10(SNR) = 30 => SNR = 10^3 = 1000.
2. C = 10^6 * log2(1 + 1000) = 10^6 * log2(1001).
3. log2(1001) ≈ log2(1024) = 10.
4. C ≈ 10 * 10^6 bps = 10 Mbit/s (exactement 9.97 Mbit/s).`,
        hint: "SNR = 10^(30/10) = 1000. log2(1001) est environ 10."
      },
      {
        id: "master-telecom-ex2",
        title: "Exercice 2 : Routage Inter-Domaine BGP vs Intra-Domaine OSPF",
        type: "mcq",
        difficulty: "Facile",
        prompt: `Niveau Master Réseaux : Protocole de Routage

Parmi les propositions suivantes sur BGP (Border Gateway Protocol), laquelle est VRAIE ?`,
        options: [
          { id: "a", text: "A) BGP est un protocole à état de lien (Link-State) utilisant l'algorithme de Dijkstra.", isCorrect: false },
          { id: "b", text: "B) BGP est un protocole de type Vector-Path (Vecteur de Chemin) inter-systèmes autonomes (AS).", isCorrect: true },
          { id: "c", text: "C) BGP utilise le port UDP 520 pour envoyer des mises à jour périodiques.", isCorrect: false },
          { id: "d", text: "D) BGP n'est utilisé que pour le routage interne dans un même LAN.", isCorrect: false }
        ],
        explanation: "B) BGP est le protocole de routage inter-AS d'Internet basé sur le Path-Vector (Path Vector Protocol) au-dessus de TCP (port 179).",
        hint: "BGP relie les Systèmes Autonomes (AS) sur Internet."
      },
      {
        id: "master-telecom-ex3-q1",
        title: "Exercice 3 : Modulation 16-QAM (Question 1/2 : Valence)",
        type: "short_answer",
        difficulty: "Facile",
        prompt: `Niveau Master Télécoms : Modulations Numériques

CONTEXTE :
On considère une modulation numérique de type 16-QAM (Quadrature Amplitude Modulation).

--------------------------------------------------
QUESTION 1 :
Combien de bits par symbole (valence n) sont transportés par une modulation 16-QAM ?`,
        correctAnswerKey: "4 bits par symbole (n = 4)",
        explanation: "Valence M = 16 = 2^4. Chaque symbole transporte n = log2(16) = 4 bits.",
        hint: "log2(16) = 4."
      },
      {
        id: "master-telecom-ex3-q2",
        title: "Exercice 3 : Modulation 16-QAM (Question 2/2 : Débit Binaire)",
        type: "short_answer",
        difficulty: "Moyen",
        prompt: `Niveau Master Télécoms : Modulations Numériques

CONTEXTE :
Modulation 16-QAM (n = 4 bits par symbole).
Rapidité de modulation R = 2 Mbaud (2 millions de symboles/sec).

--------------------------------------------------
QUESTION 2 :
Quel est le débit binaire D disponible en Mbit/s ?`,
        correctAnswerKey: "D = 8 Mbit/s",
        explanation: "Débit binaire D = R * n = 2 Mbaud * 4 bits/symbole = 8 Mbit/s.",
        hint: "D = R * n = 2 * 4 = 8 Mbit/s."
      }
    ]
  },

  {
    id: "master-maths-analyse",
    track: "all",
    category: "Matières Individuelles Master",
    professor: "ESATIC Master - Mathématiques pour l'Ingénieur",
    title: "Algèbre Linéaire & Probabilités Avancées (Master)",
    icon: "Calculator",
    color: "from-violet-600 via-purple-600 to-pink-600",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    description: "Exercices type Master ESATIC : Diagonalisation de matrices, Chaines de Markov, et Estimation de Vraisemblance (Loi de Poisson).",
    questions: [
      {
        id: "master-maths-ex1-q1",
        title: "Exercice 1 : Chaîne de Markov (Question 1/2 : Matrice de Transition)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Niveau Master Mathématiques : Processus Stochastiques

ÉNONCÉ DU PROBLÈME :
Un serveur informatique peut être dans 2 états : E1 = "Fonctionnel", E2 = "En Panne".
À chaque minute :
• Si le serveur est Fonctionnel, il a 90% de chances de le rester et 10% de tomber en panne.
• Si le serveur est En Panne, l'équipe de maintenance a 40% de chances de le réparer (retour à E1) et 60% qu'il reste en panne.

--------------------------------------------------
QUESTION 1 :
Écrire la matrice de transition P de cette chaîne de Markov.`,
        explanation: `Matrice de transition P :
P = [[0.90, 0.10],
     [0.40, 0.60]]
(Ligne 1: de E1 vers E1=0.90, E1 vers E2=0.10. Ligne 2: de E2 vers E1=0.40, E2 vers E2=0.60).`,
        hint: "P[i][j] représente la probabilité de passer de l'état i à l'état j."
      },
      {
        id: "master-maths-ex1-q2",
        title: "Exercice 1 : Chaîne de Markov (Question 2/2 : Distribution Stationnaire)",
        type: "code_written",
        difficulty: "Difficile",
        prompt: `Niveau Master Mathématiques : Processus Stochastiques

ÉNONCÉ DU PROBLÈME :
Serveur informatique : E1 = "Fonctionnel", E2 = "En Panne".
Matrice de transition P = [[0.90, 0.10], [0.40, 0.60]].

--------------------------------------------------
QUESTION 2 :
Déterminer la distribution stationnaire π = (π1, π2) telle que π * P = π et π1 + π2 = 1.`,
        explanation: `Système π * P = π :
π1 = 0.90 π1 + 0.40 π2  =>  0.10 π1 = 0.40 π2  =>  π1 = 4 π2.
Or π1 + π2 = 1  =>  4 π2 + π2 = 1  =>  5 π2 = 1  =>  π2 = 0.20 (20%).
Donc π1 = 0.80 (80%).

Le serveur est donc fonctionnel à 80% du temps en régime permanent.`,
        hint: "Isolez π1 en fonction de π2 avec 0.10 π1 = 0.40 π2 et π1 + π2 = 1."
      },
      {
        id: "master-maths-ex2",
        title: "Exercice 2 : Maximum de Vraisemblance (Loi de Poisson)",
        type: "short_answer",
        difficulty: "Moyen",
        prompt: `Niveau Master Mathématiques : Statistique Inférentielle

Soit (X1, X2, ..., Xn) un échantillon i.i.d. suivant une loi de Poisson de paramètre λ > 0.
P(X = k) = (λ^k / k!) * e^(-λ)

Déterminer l'Estimateur du Maximum de Vraisemblance (EMV) λ_EMV.`,
        correctAnswerKey: "λ_EMV = (1/n) * sum(Xi) = X_barre",
        explanation: `1. Vraisemblance L(λ) = prod (λ^Xi / Xi!) * e^(-λ) = λ^(sum Xi) / prod(Xi!) * e^(-nλ).
2. Log-vraisemblance ln L(λ) = (sum Xi) * ln(λ) - nλ - ln(prod Xi!).
3. d(ln L)/dλ = (sum Xi)/λ - n = 0  =>  λ_EMV = (1/n) sum Xi = X_barre.`,
        hint: "Dérivez le log de la vraisemblance par rapport à λ."
      }
    ]
  }
];
