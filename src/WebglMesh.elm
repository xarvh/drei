module WebglMesh exposing (..)

import WebGL
import WebglObj


type alias VertexAttributes =
    WebglObj.VertexAttributes


mesh =
    WebGL.triangles vertices


vertices =
    WebglObj.parseMesh two |> Result.withDefault []


two =
    """
# Exported from Wings 3D 2.1.5
mtllib two.mtl
o Torus2
#128 vertices, 128 faces
v 1.25000000 0.0000000e+0 0.0000000e+0
v 1.17677670 -0.17677670 0.0000000e+0
v 1.00000000 -0.25000000 0.0000000e+0
v 0.82322330 -0.17677670 0.0000000e+0
v 0.75000000 -3.0616170e-17 0.0000000e+0
v 0.82322330 0.17677670 0.0000000e+0
v 1.00000000 0.25000000 0.0000000e+0
v 1.17677670 0.17677670 0.0000000e+0
v 1.15484942 0.0000000e+0 0.47835429
v 1.08719990 -0.17677670 0.45033294
v 0.92387953 -0.25000000 0.38268343
v 0.76055916 -0.17677670 0.31503392
v 0.69290965 -3.0616170e-17 0.28701257
v 0.76055916 0.17677670 0.31503392
v 0.92387953 0.25000000 0.38268343
v 1.08719990 0.17677670 0.45033294
v 0.88388348 0.0000000e+0 0.88388348
v 0.83210678 -0.17677670 0.83210678
v 0.70710678 -0.25000000 0.70710678
v 0.58210678 -0.17677670 0.58210678
v 0.53033009 -3.0616170e-17 0.53033009
v 0.58210678 0.17677670 0.58210678
v 0.70710678 0.25000000 0.70710678
v 0.83210678 0.17677670 0.83210678
v 0.47835429 0.0000000e+0 1.15484942
v 0.45033294 -0.17677670 1.08719990
v 0.38268343 -0.25000000 0.92387953
v 0.31503392 -0.17677670 0.76055916
v 0.28701257 -3.0616170e-17 0.69290965
v 0.31503392 0.17677670 0.76055916
v 0.38268343 0.25000000 0.92387953
v 0.45033294 0.17677670 1.08719990
v 7.6540425e-17 0.0000000e+0 1.25000000
v 7.2056791e-17 -0.17677670 1.17677670
v 6.1232340e-17 -0.25000000 1.00000000
v 5.0407889e-17 -0.17677670 0.82322330
v 4.5924255e-17 -3.0616170e-17 0.75000000
v 5.0407889e-17 0.17677670 0.82322330
v 6.1232340e-17 0.25000000 1.00000000
v 7.2056791e-17 0.17677670 1.17677670
v -0.47835429 0.0000000e+0 1.15484942
v -0.45033294 -0.17677670 1.08719990
v -0.38268343 -0.25000000 0.92387953
v -0.31503392 -0.17677670 0.76055916
v -0.28701257 -3.0616170e-17 0.69290965
v -0.31503392 0.17677670 0.76055916
v -0.38268343 0.25000000 0.92387953
v -0.45033294 0.17677670 1.08719990
v -0.88388348 0.0000000e+0 0.88388348
v -0.83210678 -0.17677670 0.83210678
v -0.70710678 -0.25000000 0.70710678
v -0.58210678 -0.17677670 0.58210678
v -0.53033009 -3.0616170e-17 0.53033009
v -0.58210678 0.17677670 0.58210678
v -0.70710678 0.25000000 0.70710678
v -0.83210678 0.17677670 0.83210678
v -1.15484942 0.0000000e+0 0.47835429
v -1.08719990 -0.17677670 0.45033294
v -0.92387953 -0.25000000 0.38268343
v -0.76055916 -0.17677670 0.31503392
v -0.69290965 -3.0616170e-17 0.28701257
v -0.76055916 0.17677670 0.31503392
v -0.92387953 0.25000000 0.38268343
v -1.08719990 0.17677670 0.45033294
v -1.25000000 0.0000000e+0 1.5308085e-16
v -1.17677670 -0.17677670 1.4411358e-16
v -1.00000000 -0.25000000 1.2246468e-16
v -0.82322330 -0.17677670 1.0081578e-16
v -0.75000000 -3.0616170e-17 9.1848510e-17
v -0.82322330 0.17677670 1.0081578e-16
v -1.00000000 0.25000000 1.2246468e-16
v -1.17677670 0.17677670 1.4411358e-16
v -1.15484942 0.0000000e+0 -0.47835429
v -1.08719990 -0.17677670 -0.45033294
v -0.92387953 -0.25000000 -0.38268343
v -0.76055916 -0.17677670 -0.31503392
v -0.69290965 -3.0616170e-17 -0.28701257
v -0.76055916 0.17677670 -0.31503392
v -0.92387953 0.25000000 -0.38268343
v -1.08719990 0.17677670 -0.45033294
v -0.88388348 0.0000000e+0 -0.88388348
v -0.83210678 -0.17677670 -0.83210678
v -0.70710678 -0.25000000 -0.70710678
v -0.58210678 -0.17677670 -0.58210678
v -0.53033009 -3.0616170e-17 -0.53033009
v -0.58210678 0.17677670 -0.58210678
v -0.70710678 0.25000000 -0.70710678
v -0.83210678 0.17677670 -0.83210678
v -0.47835429 0.0000000e+0 -1.15484942
v -0.45033294 -0.17677670 -1.08719990
v -0.38268343 -0.25000000 -0.92387953
v -0.31503392 -0.17677670 -0.76055916
v -0.28701257 -3.0616170e-17 -0.69290965
v -0.31503392 0.17677670 -0.76055916
v -0.38268343 0.25000000 -0.92387953
v -0.45033294 0.17677670 -1.08719990
v -2.2962127e-16 0.0000000e+0 -1.25000000
v -2.1617037e-16 -0.17677670 -1.17677670
v -1.8369702e-16 -0.25000000 -1.00000000
v -1.5122367e-16 -0.17677670 -0.82322330
v -1.3777276e-16 -3.0616170e-17 -0.75000000
v -1.5122367e-16 0.17677670 -0.82322330
v -1.8369702e-16 0.25000000 -1.00000000
v -2.1617037e-16 0.17677670 -1.17677670
v 0.47835429 0.0000000e+0 -1.15484942
v 0.45033294 -0.17677670 -1.08719990
v 0.38268343 -0.25000000 -0.92387953
v 0.31503392 -0.17677670 -0.76055916
v 0.28701257 -3.0616170e-17 -0.69290965
v 0.31503392 0.17677670 -0.76055916
v 0.38268343 0.25000000 -0.92387953
v 0.45033294 0.17677670 -1.08719990
v 0.88388348 0.0000000e+0 -0.88388348
v 0.83210678 -0.17677670 -0.83210678
v 0.70710678 -0.25000000 -0.70710678
v 0.58210678 -0.17677670 -0.58210678
v 0.53033009 -3.0616170e-17 -0.53033009
v 0.58210678 0.17677670 -0.58210678
v 0.70710678 0.25000000 -0.70710678
v 0.83210678 0.17677670 -0.83210678
v 1.15484942 0.0000000e+0 -0.47835429
v 1.08719990 -0.17677670 -0.45033294
v 0.92387953 -0.25000000 -0.38268343
v 0.76055916 -0.17677670 -0.31503392
v 0.69290965 -3.0616170e-17 -0.28701257
v 0.76055916 0.17677670 -0.31503392
v 0.92387953 0.25000000 -0.38268343
v 1.08719990 0.17677670 -0.45033294
vn 1.00000000 4.5818250e-16 -2.2145487e-16
vn 0.70509498 -0.70911288 -1.2513545e-16
vn -1.2051732e-16 -1.00000000 0.0000000e+0
vn -0.70509498 -0.70911288 1.5167933e-17
vn -1.00000000 -3.2072775e-16 1.5272750e-17
vn -0.70509498 0.70911288 3.7919832e-17
vn 6.0258661e-17 1.00000000 0.0000000e+0
vn 0.70509498 0.70911288 -1.2892743e-16
vn 0.92387953 5.3454624e-16 0.38268343
vn 0.65142282 -0.70911288 0.26982817
vn -6.0258661e-17 -1.00000000 -2.2596998e-17
vn -0.65142282 -0.70911288 -0.26982817
vn -0.92387953 -3.5127325e-16 -0.38268343
vn -0.65142282 0.70911288 -0.26982817
vn 9.0387992e-17 1.00000000 5.2726329e-17
vn 0.65142282 0.70911288 0.26982817
vn 0.70710678 6.4145549e-16 0.70710678
vn 0.49857744 -0.70911288 0.49857744
vn -4.5193996e-17 -1.00000000 -6.0258661e-17
vn -0.49857744 -0.70911288 -0.49857744
vn -0.70710678 -3.9709150e-16 -0.70710678
vn -0.49857744 0.70911288 -0.49857744
vn 7.5323327e-17 1.00000000 9.0387992e-17
vn 0.49857744 0.70911288 0.49857744
vn 0.38268343 5.4981899e-16 0.92387953
vn 0.26982817 -0.70911288 0.65142282
vn -4.5193996e-17 -1.00000000 -7.5323327e-17
vn -0.26982817 -0.70911288 -0.65142282
vn -0.38268343 -3.5127325e-16 -0.92387953
vn -0.26982817 0.70911288 -0.65142282
vn 3.3895497e-17 1.00000000 9.0387992e-17
vn 0.26982817 0.70911288 0.65142282
vn -1.5272750e-17 4.7345525e-16 1.00000000
vn -7.5839664e-18 -0.70911288 0.70509498
vn 0.0000000e+0 -1.00000000 -6.0258661e-17
vn -7.5839664e-18 -0.70911288 -0.70509498
vn 0.0000000e+0 -3.0545500e-16 -1.00000000
vn 3.7919832e-18 0.70911288 -0.70509498
vn 0.0000000e+0 1.00000000 9.0387992e-17
vn -7.5839664e-18 0.70911288 0.70509498
vn -0.38268343 5.3454624e-16 0.92387953
vn -0.26982817 -0.70911288 0.65142282
vn 3.0129331e-17 -1.00000000 -6.0258661e-17
vn 0.26982817 -0.70911288 -0.65142282
vn 0.38268343 -3.8181875e-16 -0.92387953
vn 0.26982817 0.70911288 -0.65142282
vn -4.5193996e-17 1.00000000 1.2051732e-16
vn -0.26982817 0.70911288 0.65142282
vn -0.70710678 5.6509174e-16 0.70710678
vn -0.49857744 -0.70911288 0.49857744
vn 4.5193996e-17 -1.00000000 -5.2726329e-17
vn 0.49857744 -0.70911288 -0.49857744
vn 0.70710678 -4.1236425e-16 -0.70710678
vn 0.49857744 0.70911288 -0.49857744
vn -1.2051732e-16 1.00000000 1.3558199e-16
vn -0.49857744 0.70911288 0.49857744
vn -0.92387953 5.3454624e-16 0.38268343
vn -0.65142282 -0.70911288 0.26982817
vn 7.5323327e-17 -1.00000000 -4.1427830e-17
vn 0.65142282 -0.70911288 -0.26982817
vn 0.92387953 -3.3600050e-16 -0.38268343
vn 0.65142282 0.70911288 -0.26982817
vn -1.0545266e-16 1.00000000 6.4024828e-17
vn -0.65142282 0.70911288 0.26982817
vn -1.00000000 3.6654600e-16 5.3454624e-17
vn -0.70509498 -0.70911288 1.1375950e-17
vn 6.0258661e-17 -1.00000000 -3.3895497e-17
vn 0.70509498 -0.70911288 -1.2134346e-16
vn 1.00000000 -2.9018225e-16 -1.7563662e-16
vn 0.70509498 0.70911288 -1.2134346e-16
vn -6.0258661e-17 1.00000000 1.1298499e-17
vn -0.70509498 0.70911288 1.0617553e-16
vn -0.92387953 2.7490950e-16 -0.38268343
vn -0.65142282 -0.70911288 -0.26982817
vn 3.0129331e-17 -1.00000000 7.5323327e-18
vn 0.65142282 -0.70911288 0.26982817
vn 0.92387953 -3.0545500e-16 0.38268343
vn 0.65142282 0.70911288 0.26982817
vn -4.5193996e-17 1.00000000 -1.5064665e-17
vn -0.65142282 0.70911288 -0.26982817
vn -0.70710678 4.8872799e-16 -0.70710678
vn -0.49857744 -0.70911288 -0.49857744
vn 6.7790994e-17 -1.00000000 1.0545266e-16
vn 0.49857744 -0.70911288 0.49857744
vn 0.70710678 -3.5127325e-16 0.70710678
vn 0.49857744 0.70911288 0.49857744
vn -4.5193996e-17 1.00000000 -6.0258661e-17
vn -0.49857744 0.70911288 -0.49857744
vn -0.38268343 5.6509174e-16 -0.92387953
vn -0.26982817 -0.70911288 -0.65142282
vn 6.7790994e-17 -1.00000000 1.2051732e-16
vn 0.26982817 -0.70911288 0.65142282
vn 0.38268343 -3.5127325e-16 0.92387953
vn 0.26982817 0.70911288 0.65142282
vn -3.3895497e-17 1.00000000 -9.0387992e-17
vn -0.26982817 0.70911288 -0.65142282
vn -1.6036387e-16 4.8872799e-16 -1.00000000
vn -9.1007596e-17 -0.70911288 -0.70509498
vn 1.1298499e-17 -1.00000000 1.5064665e-17
vn 5.3087765e-17 -0.70911288 0.70509498
vn 9.1636499e-17 -3.3600050e-16 1.00000000
vn 6.0671731e-17 0.70911288 0.70509498
vn 1.5064665e-17 1.00000000 -1.2051732e-16
vn -7.5839664e-17 0.70911288 -0.70509498
vn 0.38268343 5.4981899e-16 -0.92387953
vn 0.26982817 -0.70911288 -0.65142282
vn 7.5323327e-18 -1.00000000 -3.0129331e-17
vn -0.26982817 -0.70911288 0.65142282
vn -0.38268343 -3.6654600e-16 0.92387953
vn -0.26982817 0.70911288 0.65142282
vn 6.7790994e-17 1.00000000 -1.5064665e-16
vn 0.26982817 0.70911288 -0.65142282
vn 0.70710678 5.8036449e-16 -0.70710678
vn 0.49857744 -0.70911288 -0.49857744
vn -4.5193996e-17 -1.00000000 3.7661663e-17
vn -0.49857744 -0.70911288 0.49857744
vn -0.70710678 -3.0545500e-16 0.70710678
vn -0.49857744 0.70911288 0.49857744
vn 7.5323327e-17 1.00000000 -1.1298499e-16
vn 0.49857744 0.70911288 -0.49857744
vn 0.92387953 5.1927349e-16 -0.38268343
vn 0.65142282 -0.70911288 -0.26982817
vn -1.3558199e-16 -1.00000000 5.6492495e-17
vn -0.65142282 -0.70911288 0.26982817
vn -0.92387953 -2.7490950e-16 0.38268343
vn -0.65142282 0.70911288 0.26982817
vn 4.5193996e-17 1.00000000 -4.1427830e-17
vn 0.65142282 0.70911288 -0.26982817
g Torus2_default
usemtl default
s 1
f 1//1 9//9 10//10 2//2
f 1//1 121//121 128//128 8//8
f 2//2 10//10 11//11 3//3
f 2//2 122//122 121//121 1//1
f 3//3 11//11 12//12 4//4
f 3//3 123//123 122//122 2//2
f 4//4 12//12 13//13 5//5
f 4//4 124//124 123//123 3//3
f 5//5 13//13 14//14 6//6
f 5//5 125//125 124//124 4//4
f 6//6 14//14 15//15 7//7
f 6//6 126//126 125//125 5//5
f 7//7 15//15 16//16 8//8
f 7//7 127//127 126//126 6//6
f 8//8 16//16 9//9 1//1
f 8//8 128//128 127//127 7//7
f 9//9 17//17 18//18 10//10
f 10//10 18//18 19//19 11//11
f 11//11 19//19 20//20 12//12
f 12//12 20//20 21//21 13//13
f 13//13 21//21 22//22 14//14
f 14//14 22//22 23//23 15//15
f 15//15 23//23 24//24 16//16
f 16//16 24//24 17//17 9//9
f 17//17 25//25 26//26 18//18
f 18//18 26//26 27//27 19//19
f 19//19 27//27 28//28 20//20
f 20//20 28//28 29//29 21//21
f 21//21 29//29 30//30 22//22
f 22//22 30//30 31//31 23//23
f 23//23 31//31 32//32 24//24
f 24//24 32//32 25//25 17//17
f 25//25 33//33 34//34 26//26
f 26//26 34//34 35//35 27//27
f 27//27 35//35 36//36 28//28
f 28//28 36//36 37//37 29//29
f 29//29 37//37 38//38 30//30
f 30//30 38//38 39//39 31//31
f 31//31 39//39 40//40 32//32
f 32//32 40//40 33//33 25//25
f 33//33 41//41 42//42 34//34
f 34//34 42//42 43//43 35//35
f 35//35 43//43 44//44 36//36
f 36//36 44//44 45//45 37//37
f 37//37 45//45 46//46 38//38
f 38//38 46//46 47//47 39//39
f 39//39 47//47 48//48 40//40
f 40//40 48//48 41//41 33//33
f 41//41 49//49 50//50 42//42
f 42//42 50//50 51//51 43//43
f 43//43 51//51 52//52 44//44
f 44//44 52//52 53//53 45//45
f 45//45 53//53 54//54 46//46
f 46//46 54//54 55//55 47//47
f 47//47 55//55 56//56 48//48
f 48//48 56//56 49//49 41//41
f 49//49 57//57 58//58 50//50
f 50//50 58//58 59//59 51//51
f 51//51 59//59 60//60 52//52
f 52//52 60//60 61//61 53//53
f 53//53 61//61 62//62 54//54
f 54//54 62//62 63//63 55//55
f 55//55 63//63 64//64 56//56
f 56//56 64//64 57//57 49//49
f 57//57 65//65 66//66 58//58
f 58//58 66//66 67//67 59//59
f 59//59 67//67 68//68 60//60
f 60//60 68//68 69//69 61//61
f 61//61 69//69 70//70 62//62
f 62//62 70//70 71//71 63//63
f 63//63 71//71 72//72 64//64
f 64//64 72//72 65//65 57//57
f 65//65 73//73 74//74 66//66
f 66//66 74//74 75//75 67//67
f 67//67 75//75 76//76 68//68
f 68//68 76//76 77//77 69//69
f 69//69 77//77 78//78 70//70
f 70//70 78//78 79//79 71//71
f 71//71 79//79 80//80 72//72
f 72//72 80//80 73//73 65//65
f 73//73 81//81 82//82 74//74
f 74//74 82//82 83//83 75//75
f 75//75 83//83 84//84 76//76
f 76//76 84//84 85//85 77//77
f 77//77 85//85 86//86 78//78
f 78//78 86//86 87//87 79//79
f 79//79 87//87 88//88 80//80
f 80//80 88//88 81//81 73//73
f 81//81 89//89 90//90 82//82
f 82//82 90//90 91//91 83//83
f 83//83 91//91 92//92 84//84
f 84//84 92//92 93//93 85//85
f 85//85 93//93 94//94 86//86
f 86//86 94//94 95//95 87//87
f 87//87 95//95 96//96 88//88
f 88//88 96//96 89//89 81//81
f 89//89 97//97 98//98 90//90
f 90//90 98//98 99//99 91//91
f 91//91 99//99 100//100 92//92
f 92//92 100//100 101//101 93//93
f 93//93 101//101 102//102 94//94
f 94//94 102//102 103//103 95//95
f 95//95 103//103 104//104 96//96
f 96//96 104//104 97//97 89//89
f 97//97 105//105 106//106 98//98
f 98//98 106//106 107//107 99//99
f 99//99 107//107 108//108 100//100
f 100//100 108//108 109//109 101//101
f 101//101 109//109 110//110 102//102
f 102//102 110//110 111//111 103//103
f 103//103 111//111 112//112 104//104
f 104//104 112//112 105//105 97//97
f 105//105 113//113 114//114 106//106
f 106//106 114//114 115//115 107//107
f 107//107 115//115 116//116 108//108
f 108//108 116//116 117//117 109//109
f 109//109 117//117 118//118 110//110
f 110//110 118//118 119//119 111//111
f 111//111 119//119 120//120 112//112
f 112//112 120//120 113//113 105//105
f 113//113 121//121 122//122 114//114
f 114//114 122//122 123//123 115//115
f 115//115 123//123 124//124 116//116
f 116//116 124//124 125//125 117//117
f 117//117 125//125 126//126 118//118
f 118//118 126//126 127//127 119//119
f 119//119 127//127 128//128 120//120
f 120//120 128//128 121//121 113//113
o sphere1
#114 vertices, 128 faces
v -4.84931657 0.92387953 0.0000000e+0
v -4.87844661 0.92387953 0.14644661
v -4.96140195 0.92387953 0.27059805
v -5.08555339 0.92387953 0.35355339
v -5.23200000 0.92387953 0.38268343
v -5.37844661 0.92387953 0.35355339
v -5.50259805 0.92387953 0.27059805
v -5.58555339 0.92387953 0.14644661
v -5.61468343 0.92387953 4.6865204e-17
v -5.58555339 0.92387953 -0.14644661
v -5.50259805 0.92387953 -0.27059805
v -5.37844661 0.92387953 -0.35355339
v -5.23200000 0.92387953 -0.38268343
v -5.08555339 0.92387953 -0.35355339
v -4.96140195 0.92387953 -0.27059805
v -4.87844661 0.92387953 -0.14644661
v -4.52489322 0.70710678 0.0000000e+0
v -4.57871852 0.70710678 0.27059805
v -4.73200000 0.70710678 0.50000000
v -4.96140195 0.70710678 0.65328148
v -5.23200000 0.70710678 0.70710678
v -5.50259805 0.70710678 0.65328148
v -5.73200000 0.70710678 0.50000000
v -5.88528148 0.70710678 0.27059805
v -5.93910678 0.70710678 8.6595606e-17
v -5.88528148 0.70710678 -0.27059805
v -5.73200000 0.70710678 -0.50000000
v -5.50259805 0.70710678 -0.65328148
v -5.23200000 0.70710678 -0.70710678
v -4.96140195 0.70710678 -0.65328148
v -4.73200000 0.70710678 -0.50000000
v -4.57871852 0.70710678 -0.27059805
v -4.30812047 0.38268343 0.0000000e+0
v -4.37844661 0.38268343 0.35355339
v -4.57871852 0.38268343 0.65328148
v -4.87844661 0.38268343 0.85355339
v -5.23200000 0.38268343 0.92387953
v -5.58555339 0.38268343 0.85355339
v -5.88528148 0.38268343 0.65328148
v -6.08555339 0.38268343 0.35355339
v -6.15587953 0.38268343 1.1314261e-16
v -6.08555339 0.38268343 -0.35355339
v -5.88528148 0.38268343 -0.65328148
v -5.58555339 0.38268343 -0.85355339
v -5.23200000 0.38268343 -0.92387953
v -4.87844661 0.38268343 -0.85355339
v -4.57871852 0.38268343 -0.65328148
v -4.37844661 0.38268343 -0.35355339
v -4.23200000 6.1232340e-17 0.0000000e+0
v -4.30812047 6.1232340e-17 0.38268343
v -4.52489322 6.1232340e-17 0.70710678
v -4.84931657 6.1232340e-17 0.92387953
v -5.23200000 6.1232340e-17 1.00000000
v -5.61468343 6.1232340e-17 0.92387953
v -5.93910678 6.1232340e-17 0.70710678
v -6.15587953 6.1232340e-17 0.38268343
v -6.23200000 6.1232340e-17 1.2246468e-16
v -6.15587953 6.1232340e-17 -0.38268343
v -5.93910678 6.1232340e-17 -0.70710678
v -5.61468343 6.1232340e-17 -0.92387953
v -5.23200000 6.1232340e-17 -1.00000000
v -4.84931657 6.1232340e-17 -0.92387953
v -4.52489322 6.1232340e-17 -0.70710678
v -4.30812047 6.1232340e-17 -0.38268343
v -4.30812047 -0.38268343 0.0000000e+0
v -4.37844661 -0.38268343 0.35355339
v -4.57871852 -0.38268343 0.65328148
v -4.87844661 -0.38268343 0.85355339
v -5.23200000 -0.38268343 0.92387953
v -5.58555339 -0.38268343 0.85355339
v -5.88528148 -0.38268343 0.65328148
v -6.08555339 -0.38268343 0.35355339
v -6.15587953 -0.38268343 1.1314261e-16
v -6.08555339 -0.38268343 -0.35355339
v -5.88528148 -0.38268343 -0.65328148
v -5.58555339 -0.38268343 -0.85355339
v -5.23200000 -0.38268343 -0.92387953
v -4.87844661 -0.38268343 -0.85355339
v -4.57871852 -0.38268343 -0.65328148
v -4.37844661 -0.38268343 -0.35355339
v -4.52489322 -0.70710678 0.0000000e+0
v -4.57871852 -0.70710678 0.27059805
v -4.73200000 -0.70710678 0.50000000
v -4.96140195 -0.70710678 0.65328148
v -5.23200000 -0.70710678 0.70710678
v -5.50259805 -0.70710678 0.65328148
v -5.73200000 -0.70710678 0.50000000
v -5.88528148 -0.70710678 0.27059805
v -5.93910678 -0.70710678 8.6595606e-17
v -5.88528148 -0.70710678 -0.27059805
v -5.73200000 -0.70710678 -0.50000000
v -5.50259805 -0.70710678 -0.65328148
v -5.23200000 -0.70710678 -0.70710678
v -4.96140195 -0.70710678 -0.65328148
v -4.73200000 -0.70710678 -0.50000000
v -4.57871852 -0.70710678 -0.27059805
v -4.84931657 -0.92387953 0.0000000e+0
v -4.87844661 -0.92387953 0.14644661
v -4.96140195 -0.92387953 0.27059805
v -5.08555339 -0.92387953 0.35355339
v -5.23200000 -0.92387953 0.38268343
v -5.37844661 -0.92387953 0.35355339
v -5.50259805 -0.92387953 0.27059805
v -5.58555339 -0.92387953 0.14644661
v -5.61468343 -0.92387953 4.6865204e-17
v -5.58555339 -0.92387953 -0.14644661
v -5.50259805 -0.92387953 -0.27059805
v -5.37844661 -0.92387953 -0.35355339
v -5.23200000 -0.92387953 -0.38268343
v -5.08555339 -0.92387953 -0.35355339
v -4.96140195 -0.92387953 -0.27059805
v -4.87844661 -0.92387953 -0.14644661
v -5.23200000 1.00000000 0.0000000e+0
v -5.23200000 -1.00000000 0.0000000e+0
vn 0.38219484 0.92408176 5.3242356e-17
vn 0.35310199 0.92408176 0.14625963
vn 0.27025256 0.92408176 0.27025256
vn 0.14625963 0.92408176 0.35310199
vn 6.7440318e-17 0.92408176 0.38219484
vn -0.14625963 0.92408176 0.35310199
vn -0.27025256 0.92408176 0.27025256
vn -0.35310199 0.92408176 0.14625963
vn -0.38219484 0.92408176 3.5849853e-16
vn -0.35310199 0.92408176 -0.14625963
vn -0.27025256 0.92408176 -0.27025256
vn -0.14625963 0.92408176 -0.35310199
vn 1.5617758e-16 0.92408176 -0.38219484
vn 0.14625963 0.92408176 -0.35310199
vn 0.27025256 0.92408176 -0.27025256
vn 0.35310199 0.92408176 -0.14625963
vn 0.70658450 0.70762868 -2.0004106e-16
vn 0.65279895 0.70762868 0.27039818
vn 0.49963069 0.70762868 0.49963069
vn 0.27039818 0.70762868 0.65279895
vn 0.0000000e+0 0.70762868 0.70658450
vn -0.27039818 0.70762868 0.65279895
vn -0.49963069 0.70762868 0.49963069
vn -0.65279895 0.70762868 0.27039818
vn -0.70658450 0.70762868 6.0012317e-16
vn -0.65279895 0.70762868 -0.27039818
vn -0.49963069 0.70762868 -0.49963069
vn -0.27039818 0.70762868 -0.65279895
vn 5.0010264e-17 0.70762868 -0.70658450
vn 0.27039818 0.70762868 -0.65279895
vn 0.49963069 0.70762868 -0.49963069
vn 0.65279895 0.70762868 -0.27039818
vn 0.92368212 0.38315969 -7.5490053e-16
vn 0.85337100 0.38315969 0.35347784
vn 0.65314189 0.38315969 0.65314189
vn 0.35347784 0.38315969 0.85337100
vn 0.0000000e+0 0.38315969 0.92368212
vn -0.35347784 0.38315969 0.85337100
vn -0.65314189 0.38315969 0.65314189
vn -0.85337100 0.38315969 0.35347784
vn -0.92368212 0.38315969 2.8039162e-16
vn -0.85337100 0.38315969 -0.35347784
vn -0.65314189 0.38315969 -0.65314189
vn -0.35347784 0.38315969 -0.85337100
vn -7.1895288e-18 0.38315969 -0.92368212
vn 0.35347784 0.38315969 -0.85337100
vn 0.65314189 0.38315969 -0.65314189
vn 0.85337100 0.38315969 -0.35347784
vn 1.00000000 7.2082126e-18 -1.0091498e-15
vn 0.92387953 0.0000000e+0 0.38268343
vn 0.70710678 0.0000000e+0 0.70710678
vn 0.38268343 0.0000000e+0 0.92387953
vn 0.0000000e+0 0.0000000e+0 1.00000000
vn -0.38268343 7.2082126e-18 0.92387953
vn -0.70710678 -7.2082126e-18 0.70710678
vn -0.92387953 0.0000000e+0 0.38268343
vn -1.00000000 0.0000000e+0 0.0000000e+0
vn -0.92387953 0.0000000e+0 -0.38268343
vn -0.70710678 -7.2082126e-18 -0.70710678
vn -0.38268343 0.0000000e+0 -0.92387953
vn -2.8832850e-17 7.2082126e-18 -1.00000000
vn 0.38268343 0.0000000e+0 -0.92387953
vn 0.70710678 -7.2082126e-18 -0.70710678
vn 0.92387953 0.0000000e+0 -0.38268343
vn 0.92368212 -0.38315969 -1.0281026e-15
vn 0.85337100 -0.38315969 0.35347784
vn 0.65314189 -0.38315969 0.65314189
vn 0.35347784 -0.38315969 0.85337100
vn 0.0000000e+0 -0.38315969 0.92368212
vn -0.35347784 -0.38315969 0.85337100
vn -0.65314189 -0.38315969 0.65314189
vn -0.85337100 -0.38315969 0.35347784
vn -0.92368212 -0.38315969 7.1895288e-18
vn -0.85337100 -0.38315969 -0.35347784
vn -0.65314189 -0.38315969 -0.65314189
vn -0.35347784 -0.38315969 -0.85337100
vn -5.0326702e-17 -0.38315969 -0.92368212
vn 0.35347784 -0.38315969 -0.85337100
vn 0.65314189 -0.38315969 -0.65314189
vn 0.85337100 -0.38315969 -0.35347784
vn 0.70658450 -0.70762868 -7.9659207e-16
vn 0.65279895 -0.70762868 0.27039818
vn 0.49963069 -0.70762868 0.49963069
vn 0.27039818 -0.70762868 0.65279895
vn 0.0000000e+0 -0.70762868 0.70658450
vn -0.27039818 -0.70762868 0.65279895
vn -0.49963069 -0.70762868 0.49963069
vn -0.65279895 -0.70762868 0.27039818
vn -0.70658450 -0.70762868 7.1443235e-18
vn -0.65279895 -0.70762868 -0.27039818
vn -0.49963069 -0.70762868 -0.49963069
vn -0.27039818 -0.70762868 -0.65279895
vn -3.5721617e-18 -0.70762868 -0.70658450
vn 0.27039818 -0.70762868 -0.65279895
vn 0.49963069 -0.70762868 -0.49963069
vn 0.65279895 -0.70762868 -0.27039818
vn 0.38219484 -0.92408176 -2.6976127e-16
vn 0.35310199 -0.92408176 0.14625963
vn 0.27025256 -0.92408176 0.27025256
vn 0.14625963 -0.92408176 0.35310199
vn -3.9044395e-17 -0.92408176 0.38219484
vn -0.14625963 -0.92408176 0.35310199
vn -0.27025256 -0.92408176 0.27025256
vn -0.35310199 -0.92408176 0.14625963
vn -0.38219484 -0.92408176 3.9044395e-17
vn -0.35310199 -0.92408176 -0.14625963
vn -0.27025256 -0.92408176 -0.27025256
vn -0.14625963 -0.92408176 -0.35310199
vn -6.7440318e-17 -0.92408176 -0.38219484
vn 0.14625963 -0.92408176 -0.35310199
vn 0.27025256 -0.92408176 -0.27025256
vn 0.35310199 -0.92408176 -0.14625963
vn 9.7352198e-17 1.00000000 -4.4250999e-19
vn -9.3812118e-17 -1.00000000 7.7439248e-17
g sphere1_default
usemtl default
s 1
f 129//129 145//145 160//160 144//144
f 129//129 241//241 130//130
f 130//130 146//146 145//145 129//129
f 130//130 241//241 131//131
f 131//131 147//147 146//146 130//130
f 131//131 241//241 132//132
f 132//132 148//148 147//147 131//131
f 132//132 241//241 133//133
f 133//133 149//149 148//148 132//132
f 133//133 241//241 134//134
f 134//134 150//150 149//149 133//133
f 134//134 241//241 135//135
f 135//135 151//151 150//150 134//134
f 135//135 241//241 136//136
f 136//136 152//152 151//151 135//135
f 136//136 241//241 137//137
f 137//137 153//153 152//152 136//136
f 137//137 241//241 138//138
f 138//138 154//154 153//153 137//137
f 138//138 241//241 139//139
f 139//139 155//155 154//154 138//138
f 139//139 241//241 140//140
f 140//140 156//156 155//155 139//139
f 140//140 241//241 141//141
f 141//141 157//157 156//156 140//140
f 141//141 241//241 142//142
f 142//142 158//158 157//157 141//141
f 142//142 241//241 143//143
f 143//143 159//159 158//158 142//142
f 143//143 241//241 144//144
f 144//144 160//160 159//159 143//143
f 144//144 241//241 129//129
f 145//145 161//161 176//176 160//160
f 146//146 162//162 161//161 145//145
f 147//147 163//163 162//162 146//146
f 148//148 164//164 163//163 147//147
f 149//149 165//165 164//164 148//148
f 150//150 166//166 165//165 149//149
f 151//151 167//167 166//166 150//150
f 152//152 168//168 167//167 151//151
f 153//153 169//169 168//168 152//152
f 154//154 170//170 169//169 153//153
f 155//155 171//171 170//170 154//154
f 156//156 172//172 171//171 155//155
f 157//157 173//173 172//172 156//156
f 158//158 174//174 173//173 157//157
f 159//159 175//175 174//174 158//158
f 160//160 176//176 175//175 159//159
f 161//161 177//177 192//192 176//176
f 162//162 178//178 177//177 161//161
f 163//163 179//179 178//178 162//162
f 164//164 180//180 179//179 163//163
f 165//165 181//181 180//180 164//164
f 166//166 182//182 181//181 165//165
f 167//167 183//183 182//182 166//166
f 168//168 184//184 183//183 167//167
f 169//169 185//185 184//184 168//168
f 170//170 186//186 185//185 169//169
f 171//171 187//187 186//186 170//170
f 172//172 188//188 187//187 171//171
f 173//173 189//189 188//188 172//172
f 174//174 190//190 189//189 173//173
f 175//175 191//191 190//190 174//174
f 176//176 192//192 191//191 175//175
f 177//177 193//193 208//208 192//192
f 178//178 194//194 193//193 177//177
f 179//179 195//195 194//194 178//178
f 180//180 196//196 195//195 179//179
f 181//181 197//197 196//196 180//180
f 182//182 198//198 197//197 181//181
f 183//183 199//199 198//198 182//182
f 184//184 200//200 199//199 183//183
f 185//185 201//201 200//200 184//184
f 186//186 202//202 201//201 185//185
f 187//187 203//203 202//202 186//186
f 188//188 204//204 203//203 187//187
f 189//189 205//205 204//204 188//188
f 190//190 206//206 205//205 189//189
f 191//191 207//207 206//206 190//190
f 192//192 208//208 207//207 191//191
f 193//193 209//209 224//224 208//208
f 194//194 210//210 209//209 193//193
f 195//195 211//211 210//210 194//194
f 196//196 212//212 211//211 195//195
f 197//197 213//213 212//212 196//196
f 198//198 214//214 213//213 197//197
f 199//199 215//215 214//214 198//198
f 200//200 216//216 215//215 199//199
f 201//201 217//217 216//216 200//200
f 202//202 218//218 217//217 201//201
f 203//203 219//219 218//218 202//202
f 204//204 220//220 219//219 203//203
f 205//205 221//221 220//220 204//204
f 206//206 222//222 221//221 205//205
f 207//207 223//223 222//222 206//206
f 208//208 224//224 223//223 207//207
f 209//209 225//225 240//240 224//224
f 210//210 226//226 225//225 209//209
f 211//211 227//227 226//226 210//210
f 212//212 228//228 227//227 211//211
f 213//213 229//229 228//228 212//212
f 214//214 230//230 229//229 213//213
f 215//215 231//231 230//230 214//214
f 216//216 232//232 231//231 215//215
f 217//217 233//233 232//232 216//216
f 218//218 234//234 233//233 217//217
f 219//219 235//235 234//234 218//218
f 220//220 236//236 235//235 219//219
f 221//221 237//237 236//236 220//220
f 222//222 238//238 237//237 221//221
f 223//223 239//239 238//238 222//222
f 224//224 240//240 239//239 223//223
f 225//225 242//242 240//240
f 226//226 242//242 225//225
f 227//227 242//242 226//226
f 228//228 242//242 227//227
f 229//229 242//242 228//228
f 230//230 242//242 229//229
f 231//231 242//242 230//230
f 232//232 242//242 231//231
f 233//233 242//242 232//232
f 234//234 242//242 233//233
f 235//235 242//242 234//234
f 236//236 242//242 235//235
f 237//237 242//242 236//236
f 238//238 242//242 237//237
f 239//239 242//242 238//238
f 240//240 242//242 239//239
"""
