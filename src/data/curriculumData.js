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

      // EXERCICE 3
      {
        id: "2025-info-ex3-q1",
        title: "Exercice 3 : Adressage IP (Question 1/5)",
        type: "mcq",
        difficulty: "Moyen",
        prompt: `Exercice 3 : Adressage IP (5 pts)

Contexte :
ESATIC-Services exploite deux sites (Abidjan et Yamoussoukro) interconnectés par VPN.
• Bloc IPv4 attribué : 172.30.0.0/20
• Bloc IPv6 attribué : 2001:db8:bf::/48

Site d'Abidjan :
  • Département IT : 90 postes + 10 serveurs = 100 machines.

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

Contexte :
ESATIC-Services - Site d'Abidjan (Département Finance : 40 postes).
Réseau Finance : 172.30.6.64/26.

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

Contexte IPv6 :
• Bloc IPv6 attribué : 2001:db8:bf::/48
• Règle entreprise : « l'ID-Sous-réseau est égal au numéro de VLAN »
• Réseau Wi-Fi Visiteurs : VLAN 30

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

      // EXERCICE 4 : ASSURANCE AUTO (SÉPARATION DES ENTITÉS ET MCD)
      {
        id: "2025-info-ex4-q1a",
        title: "Exercice 4 : Assurance Auto (1.a : Identification des Entités)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 4 : Gestion d'une assurance automobile (3 pts)

ÉNONCÉ CONTEXTUEL :
Une compagnie d'assurance souhaite gérer les contrats d'assurance automobile de ses clients :
• Un client peut souscrire plusieurs contrats auto ; un contrat est associé à un seul véhicule.
• Un véhicule n'appartient qu'à un seul client à un moment donné.
• Chaque contrat couvre une période donnée (date de début, date de fin).
• La compagnie propose plusieurs types de garanties (vol, incendie, etc.). Un contrat peut inclure plusieurs garanties.
• En cas d'incident, le client déclare un sinistre, lié à un contrat et à un véhicule.
• Chaque sinistre donne lieu à un suivi de traitement (état : en cours, traité, refusé) et une évaluation du montant pris en charge.

==================================================
TRAVAIL À FAIRE (Question 1.a) :
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
        title: "Exercice 4 : Assurance Auto (1.b : Modèle Entité-Association)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 4 : Gestion d'une assurance automobile (3 pts)

ÉNONCÉ CONTEXTUEL (Rappel Entités) :
• Entités : CLIENT, VEHICULE, CONTRAT, GARANTIE, SINISTRE

==================================================
TRAVAIL À FAIRE (Question 1.b) :
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
        title: "Exercice 4 : Assurance Auto (2 : Modèle Relationnel MLD)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 4 : Gestion d'une assurance automobile (3 pts)

==================================================
TRAVAIL À FAIRE (Question 2) :
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
        title: "Exercice 4 : Assurance Auto (3 : Scripts SQL DDL)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 4 : Gestion d'une assurance automobile (3 pts)

==================================================
TRAVAIL À FAIRE (Question 3) :
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

      // EXERCICE 5
      {
        id: "2025-info-ex5-q1",
        title: "Exercice 5 : PHP - PDO & Sécurité (1/2)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 5 : PHP - PDO & Sécurité (3 pts)

==================================================
TRAVAIL À FAIRE (Question 1/2) :
a) Établissez une connexion PDO sécurisée avec gestion d'erreurs (Try/Catch).
b) Implémentez une requête préparée pour vérifier les identifiants.`,
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
        title: "Exercice 5 : PHP - PDO & Sécurité (2/2 QCM)",
        type: "mcq",
        difficulty: "Facile",
        prompt: `Exercice 5 : PHP - PDO & Sécurité (3 pts)

==================================================
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

      // EXERCICE 6
      {
        id: "2025-info-ex6-q1",
        title: "Exercice 6 : POO Java & Collections (1/3 QCM)",
        type: "mcq",
        difficulty: "Facile",
        prompt: `Exercice 6 : Modélisation UML & Collections (4pts)

java
public class Livre {
    private String isbn; // Format "123-4567890123"
}

==================================================
QUESTION 1 :
Quelle collection utiliser pour stocker des objets Livre sans doublons d'ISBN ?`,
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
        title: "Exercice 6 : POO Java & Collections (2/3 Code)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Exercice 6 : Modélisation UML & Collections (4pts)

==================================================
QUESTION 2 :
Implémentez la vérification d'unicité d'ISBN dans la méthode :

java
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
        title: "Exercice 6 : POO Java & Collections (3/3 Théorie)",
        type: "code_written",
        difficulty: "Facile",
        prompt: `Exercice 6 : Modélisation UML & Collections (4pts)

==================================================
QUESTION 3 :
Pourquoi ne doit-on pas utiliser java.util.Vector dans une application moderne ?`,
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
      {
        id: "2025-math-ex1",
        title: "EXERCICE 1 : Matrice & Jordan (5 pts)",
        type: "code_written",
        difficulty: "Difficile",
        prompt: `EXERCICE 1 : (5 points)

Soit A la matrice de M4(R) suivante :
[-2  -1   1   2]
[ 1  -4   1   2]
[ 0   0  -5   4]
[ 0   0  -1  -1]

1) Déterminer le polynôme caractéristique de A.
2) Déterminer les valeurs propres de A.
3) La matrice A est-elle diagonalisable ? Justifier votre réponse.
4) Déterminer une réduite de Jordan de A.`,
        explanation: `1) P_A(X) = (X + 3)^4.
2) Valeur propre unique : λ = -3 (multiplicité 4).
3) dim(E_-3) = 4 - rg(A + 3I) = 4 - 2 = 2 < 4. A n'est PAS diagonalisable.
4) Réduite de Jordan J formée de 2 blocs de Jordan associés à λ = -3.`,
        hint: "Décomposez la matrice en blocs 2x2."
      },
      {
        id: "2025-math-ex2",
        title: "EXERCICE 2 : Suites & Télescopage (5 pts)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 2 : (5 points)

Soit n dans N*. On définit trois suites u_n, v_n et S_n par :
u_n = sum_{k=1}^n 1/k ; v_n = sum_{k=1}^n k^2 et S_n = sum_{k=1}^n 1/v_k

1) Calculer de deux façons différentes sum_{k=1}^n ((k+1)^3 - k^3).
2) Montrer que forall n dans N*, v_n = n(n+1)(2n+1)/6.
3) Déterminer les réels a, b et c tels que :
forall n dans N*, 1/(n(n+1)(2n+1)) = a/n + b/(n+1) + c/(2n+1)
4) Montrer que forall n dans N*, sum_{k=1}^n 1/(2k+1) = u_{n+1} - 1/2 u_n - 1.
5) Exprimer pour n dans N*, S_n à l'aide de la suite u_n.`,
        explanation: `1) Par télescopage : (n+1)^3 - 1.
2) En développant (k+1)^3 - k^3 = 3k^2 + 3k + 1.
3) a = 1, b = 1, c = -4.
5) Expression de S_n au moyen de u_n.`,
        hint: "Développez (k+1)^3 - k^3 = 3k^2 + 3k + 1."
      },
      {
        id: "2025-math-ex3",
        title: "EXERCICE 3 : Normes C1 (4 pts)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `EXERCICE 3 : (4 points)

On note E le R-espace vectoriel des applications f : [0; 1] -> R de classe C1 telles que f(0) = 0.
On note pour toute f dans E :
N(f) = integral_0^1 |f'| et V(f) = integral_0^1 |f' + f|

1) Donner la définition d'une norme sur E.
2) Résoudre dans E l'équation différentielle f' + f = 0.
3) Montrer que N et V sont des normes sur E.
4) Montrer que pour toute f dans E : V(f) <= 2 N(f).`,
        explanation: `1) Séparation, Homogénéité, Inégalité triangulaire.
2) f(x) = C e^-x. f(0) = 0 => C = 0 donc f = 0.
3) N et V vérifient les 3 axiomes des normes.
4) |f(x)| <= N(f), d'où V(f) <= N(f) + N(f) = 2 N(f).`,
        hint: "Utilisez f(0)=0 pour l'axiome de séparation."
      },
      {
        id: "2025-math-ex4",
        title: "EXERCICE 4 : Harmoniques du Signal (4 pts)",
        type: "short_answer",
        difficulty: "Moyen",
        prompt: `EXERCICE 4 : (4 points)

Un signal rectangulaire d'amplitude A et de fréquence f se décompose en une somme de fonctions sinusoïdales de la manière suivante :
e(t) = (4/π) A sum_{n=0}^{+infty} (1/(2n+1)) sin((2n+1)ω t)

1. Donner l'amplitude et la fréquence du fondamental d'un signal rectangulaire de fréquence 4 kHz et d'amplitude 3 volt.
2. Donner l'amplitude et la fréquence du 1er harmonique.
3. Donner l'amplitude et la fréquence du 2ème harmonique.
4. Représenter sur un graphe les différents harmoniques plus le fondamental, on placera en abscisse les fréquences et en ordonnée les amplitudes.`,
        correctAnswerKey: "Fondamental: 4 kHz, 12/π V (~3.82V). 1er harmonique: 12 kHz, 4/π V (~1.27V). 2ème harmonique: 20 kHz, 12/(5π) V (~0.76V).",
        explanation: "1. n=0 : f0 = 4 kHz, A0 = 12/π V.\n2. n=1 : f1 = 12 kHz, A1 = 4/π V.\n3. n=2 : f2 = 20 kHz, A2 = 12/(5π) V.",
        hint: "Pour l'harmonique de rang n, la fréquence est (2n+1)*f."
      },
      {
        id: "2025-math-ex5",
        title: "EXERCICE 5 : Bernoulli EMV (2 pts)",
        type: "short_answer",
        difficulty: "Facile",
        prompt: `EXERCICE 5 : (2 points)

On considère un échantillon (X1, X2, ..., Xn) issu d'une loi de Bernoulli de paramètre θ, avec θ dans ]0, 1[. Déterminer l'estimateur du maximum de vraisemblance de θ.`,
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
        id: "master-algo-ex3",
        title: "Exercice 3 : Arbres & Structures de Données (B-Tree vs AVL)",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Niveau Master Info : Structures de Données Avancées

1) Pourquoi les moteurs de bases de données (PostgreSQL, MySQL) utilisent-ils des B-Trees (ou B+Trees) plutôt que des arbres AVL pour leurs index ?
2) Donner la hauteur maximale d'un arbre B-Tree d'ordre m contenant N clés.`,
        explanation: `1) Les B-Trees ont un facteur de branchement très élevé (m grands), ce qui réduit drastiquement la hauteur de l'arbre et donc le nombre d'accès disque (I/O). Les arbres AVL, étant binaires, nécessitent beaucoup plus d'accès disque.
2) Hauteur max H <= log_ceil(m/2) ((N + 1) / 2). Complexité des recherches en O(log N).`,
        hint: "Pensez aux accès disque (I/O) et au facteur de branchement."
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
        id: "master-bdd-ex1",
        title: "Exercice 1 : Normalisation de Relational Schema (BCNF)",
        type: "code_written",
        difficulty: "Difficile",
        prompt: `Niveau Master Info : Théorie des Bases de Données

Soit la relation R(A, B, C, D) et l'ensemble de dépendances fonctionnelles DF = { A -> B, BC -> D, D -> A }.

1) Déterminer les clés candidates de la relation R.
2) La relation R est-elle en 3NF ? En BCNF ? Justifier précisément.`,
        explanation: `1) Clés candidates : (A, C), (D, C), et (B, C) car (BC)+ = BCAD = R.
2) 
   - 3NF : Oui, car pour chaque X -> Y, soit X est une sur-clé, soit Y est un attribut prime (appartient à une clé candidate).
   - BCNF : Non ! Car D -> A est une DF valide mais D n'est pas une sur-clé (D+ = DA != R).`,
        hint: "Calculez la fermeture des attributs (A,C)+, (B,C)+, (D,C)+."
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
        id: "master-telecom-ex3",
        title: "Exercice 3 : Modulation Numérique 16-QAM",
        type: "code_written",
        difficulty: "Moyen",
        prompt: `Niveau Master Télécoms : Modulations Numériques

1) Combien de bits par symbole (valence) sont transportés par une modulation 16-QAM ?
2) Si le débit symbole (Rapidité de modulation R) est de 2 Mbaud (2 millions de symboles/sec), quel est le débit binaire D disponible ?`,
        explanation: `1) Valence M = 16 = 2^4. Chaque symbole transporte n = log2(16) = 4 bits.
2) Débit binaire D = R * n = 2 Mbaud * 4 bits/symbole = 8 Mbit/s.`,
        hint: "M = 16 => n = log2(16) = 4 bits/symbole. D = R * log2(M)."
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
        id: "master-maths-ex1",
        title: "Exercice 1 : Chaîne de Markov & Matrice de Transition",
        type: "code_written",
        difficulty: "Difficile",
        prompt: `Niveau Master Mathématiques : Processus Stochastiques

Un serveur informatique peut être dans 2 états : E1 = "Fonctionnel", E2 = "En Panne".
À chaque minute :
• Si le serveur est Fonctionnel, il a 90% de chances de le rester et 10% de tomber en panne.
• Si le serveur est En Panne, l'équipe de maintenance a 40% de chances de le réparer (retour à E1) et 60% qu'il reste en panne.

1) Écrire la matrice de transition P de cette chaîne de Markov.
2) Déterminer la distribution stationnaire π = (π1, π2) telle que π * P = π et π1 + π2 = 1.`,
        explanation: `1) Matrice P :
   P = [[0.90, 0.10],
        [0.40, 0.60]]

2) Système π * P = π :
   π1 = 0.90 π1 + 0.40 π2  =>  0.10 π1 = 0.40 π2  =>  π1 = 4 π2
   Or π1 + π2 = 1  =>  4 π2 + π2 = 1  =>  5 π2 = 1  =>  π2 = 0.20 (20%)
   Donc π1 = 0.80 (80%).

Le serveur est donc fonctionnel à 80% du temps en régime permanent.`,
        hint: "Résolvez le système 0.10*π1 = 0.40*π2 avec π1 + π2 = 1."
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
