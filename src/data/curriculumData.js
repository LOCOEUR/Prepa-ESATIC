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
  }
];
