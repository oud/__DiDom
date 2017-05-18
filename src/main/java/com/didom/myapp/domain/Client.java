package com.didom.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "client")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "overview")
    private String overview;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "client")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Job> jobs = new HashSet<>();

    @ManyToOne
    private Location address;

    @OneToMany(mappedBy = "client")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contract> contracts = new HashSet<>();

    @OneToMany(mappedBy = "client")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Message> messages = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOverview() {
        return overview;
    }

    public Client overview(String overview) {
        this.overview = overview;
        return this;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public User getUser() {
        return user;
    }

    public Client user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Job> getJobs() {
        return jobs;
    }

    public Client jobs(Set<Job> jobs) {
        this.jobs = jobs;
        return this;
    }

    public Client addJob(Job job) {
        this.jobs.add(job);
        job.setClient(this);
        return this;
    }

    public Client removeJob(Job job) {
        this.jobs.remove(job);
        job.setClient(null);
        return this;
    }

    public void setJobs(Set<Job> jobs) {
        this.jobs = jobs;
    }

    public Location getAddress() {
        return address;
    }

    public Client address(Location location) {
        this.address = location;
        return this;
    }

    public void setAddress(Location location) {
        this.address = location;
    }

    public Set<Contract> getContracts() {
        return contracts;
    }

    public Client contracts(Set<Contract> contracts) {
        this.contracts = contracts;
        return this;
    }

    public Client addContract(Contract contract) {
        this.contracts.add(contract);
        contract.setClient(this);
        return this;
    }

    public Client removeContract(Contract contract) {
        this.contracts.remove(contract);
        contract.setClient(null);
        return this;
    }

    public void setContracts(Set<Contract> contracts) {
        this.contracts = contracts;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Client messages(Set<Message> messages) {
        this.messages = messages;
        return this;
    }

    public Client addMessage(Message message) {
        this.messages.add(message);
        message.setClient(this);
        return this;
    }

    public Client removeMessage(Message message) {
        this.messages.remove(message);
        message.setClient(null);
        return this;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Client client = (Client) o;
        if (client.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, client.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + id +
            ", overview='" + overview + "'" +
            '}';
    }
}
