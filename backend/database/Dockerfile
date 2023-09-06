# This has to be licensed manually from the workbench
# Safe to push to Docker Hub
FROM ontotext/graphdb:10.0.0
EXPOSE 7200
CMD ["-Dgraphdb.home=/opt/graphdb/home"]

ENTRYPOINT ["/opt/graphdb/dist/bin/graphdb"]

COPY config/TRDK1_GRAPHDB-config.ttl /opt/graphdb/home/conf/TRDK1_GRAPHDB-config.ttl
COPY ontology /opt/graphdb/home/ontology
RUN /opt/graphdb/dist/bin/importrdf load -c /opt/graphdb/home/conf/TRDK1_GRAPHDB-config.ttl -m parallel /opt/graphdb/home/ontology