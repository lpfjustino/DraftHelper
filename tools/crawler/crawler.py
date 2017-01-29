# Dynamic import to support cross compatibility between Python 2 and 3

try:
    import urllib.request as urllib2
except ImportError:
    import urllib2

try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO

import sys, os
from bs4 import BeautifulSoup
from parse import *
import json

def getChampionRole():
    champRole = []

    # Fetch the general statistics info from champion.gg
    site= "http://champion.gg/statistics/"
    hdr = {'User-Agent': 'Mozilla/5.0'}
    req = urllib2.Request(site, headers=hdr)
    page = urllib2.urlopen(req)
    statsPage = str(BeautifulSoup(page, "html.parser"))

    # Parse to gather the statistics JSON
    statsJSON = search("matchupData.stats = {};", statsPage)[0]

    # Parse JSON to associative array
    statsJSONIO = StringIO(statsJSON)
    champs = json.load(statsJSONIO)
    for champ in champs:
        cr = champ['key'], champ['role']
        champRole.append(cr)

    return champRole

def crawlChampsPage(champRole):
    # Try to create the directory if needed
    dirName = 'stats'
    try:
        os.mkdir(dirName)
    except FileExistsError:
        print("Directory already exists. Crawling:")

    # For every champ in every role it's played
    for elem in champRole:
        site= "http://champion.gg/champion/"+elem[0]+"/"+elem[1]
        hdr = {'User-Agent': 'Mozilla/5.0'}
        req = urllib2.Request(site, headers=hdr)
        page = urllib2.urlopen(req)
        champStats = str(BeautifulSoup(page, "html.parser"))
        #print soup

        # Parse to gather the statistics JSON
        rolePlayRateJSON = search("matchupData.champion = {};", champStats)[0]
        champStatsJSON = search("matchupData.championData = {};", champStats)[0]

        # Write role playrate and stats to 2 different files
        filename = elem[0] + "_" + elem[1] + "_RPR.json"
        with open(dirName + "/" + filename, 'w') as f:
            f.write(rolePlayRateJSON)
        filename = elem[0] + "_" + elem[1] + "_CS.json"
        with open(dirName + "/" + filename, 'w') as f:
            f.write(champStatsJSON)

'''
champs = getChampions()

for champName in champs:
    print champs[champName]
'''

champRole = getChampionRole()
crawlChampsPage(champRole)


